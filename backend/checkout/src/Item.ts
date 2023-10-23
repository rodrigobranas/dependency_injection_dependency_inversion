export default class Item {

	constructor (readonly amount: number, readonly quantity: number) {
	}

	getSubtotal () {
		return this.quantity * this.amount;
	}
}
