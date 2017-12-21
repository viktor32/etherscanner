function step(log, db) {
	if(!this.data.length) {
		this.data = [{
			depth: log.depth,
			accountAddress: log.account,
			transfers: []
		}];
	}
	
	if(this.data.error)
		return;
	
	// If an error occurred (eg, out of gas), discard the current stack frame
	if(log.err) {
		if(this.data[this.data.length - 1].depth == log.depth)
			this.data = this.data.slice(0, -1);
		return;
	}
	if(log.op.toString() == 'REVERT') {
		if(this.data[this.data.length - 1].depth == log.depth)
			this.data = this.data.slice(0, -1);
		return;
	}
	// If we just returned from a call
	
	if(log.depth == this.data.length - 1) {
		var returnFrame = this.data[this.data.length - 1];
		this.data = this.data.slice(0, -1);
		var topFrame = this.data[this.data.length - 1];
		if(returnFrame.op == "CREATE") {
			// Now we know our new address, fill it in everywhere.
			var createdAddress = log.stack.peek(0).String();
			if(!topFrame.accountAddress) {
				topFrame.accountAddress = log.stack.peek(0).Bytes();
			}

			returnFrame.transfers.forEach(function(tx, i) {
				if(!tx.to) returnFrame.transfers[i].to = createdAddress;
				else if(!tx.from) returnFrame.transfers[i].from = createdAddress;
			});
		}
		
		// Our call succeded, so add any transfers that happened to the current stack frame
		topFrame.transfers = topFrame.transfers.concat(returnFrame.transfers);
		this.data[this.data.length - 1] = topFrame;
	} else if(log.depth != this.data.length) {
		this.data = {
			error: "Unexpected stack transition: was " + this.data.length + ", now " + log.depth
		};
		return;
	}
	
	var value, from, transfers;
	switch(log.op.toString()) {
		case "CREATE": {
			// CREATE adds a frame to the stack, but we don't know their address yet - we'll fill it in
			// when the call returns.
			value = log.stack.peek(0).Uint64();
			from = this.data[this.data.length - 1].accountAddress;
			
			transfers = [{
				depth: this.data.length,
				from: from,
				to: "",
				value: value,
				kind: "CREATION"
			}];
			this.data.push({
				depth: log.depth,
				op: log.op.toString(),
				accountAddress: "",
				transfers: transfers
			});
			break;
		}
		case "CALL": {
			// CALL adds a frame to the stack with the target address and value
			value = log.stack.peek(2).Uint64();
			var to = log.stack.peek(1).String();
			transfers = [];
			from = "";
			if(typeof this.data[this.data.length - 1].accountAddress !== 'string' && value > 0 && value <= db.getBalance(this.data[this.data.length - 1].accountAddress).Uint64()) {
				from = '0x' + this.data[this.data.length - 1].accountAddress.map(function(byte) {
					return ('0' + (byte & 0xFF).toString(16)).slice(-2);
				}).join('');
				transfers.push({
					depth: this.data.length,
					from: from,
					to: to,
					value: value,
					kind: "CALL"
				});
			}
			this.data.push({
				depth: log.depth,
				value: value,
				op: log.op,
				accountAddress: log.stack.peek(1).Bytes(),
				transfers: transfers
			});
			break;
		}
		case "CALLCODE":
		case "DELEGATECALL":
			// CALLCODE and DELEGATECALL don't transfer value or change the from address, but do create
			// a separate failure domain.
			this.data.push({
				depth: log.depth,
				op: log.op.toString(),
				accountAddress: this.data[this.data.length - 1].accountAddress,
				transfers: []
			});
			break;
		case "SUICIDE":
		case "SELFDESTRUCT": {
			// SUICIDE results in a transfer back to the calling address.
			var frame = this.data[this.data.length - 1];
			value = db.getBalance(frame.accountAddress);
			frame.transfers.push({
				depth: this.data.length,
				from: frame.accountAddress,
				to: log.stack.peek(0).String(),
				value: value,
				kind: "SELFDESTRUCT"
			});
			this.data[this.data.length - 1] = frame;
		}
	}
}