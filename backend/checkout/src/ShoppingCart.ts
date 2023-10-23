import { CalculateTaxFactory } from "./CalculateTax";
import Item from "./Item";

export default class ShoppingCart {
	items: Item[];
	subtotal = 0;
	taxes = 0;
	total = 0;

	constructor (readonly freight: number, readonly protection: number, readonly country: string) {
		this.items = [];
	}

	addItem (amount: number, quantity: number) {
		this.items.push(new Item(amount, quantity));
	}

	calculate () {
		this.calculateSubtotal();
		this.calculateTaxes();
		this.calculateTotal();
	}

	private calculateSubtotal () {
		this.subtotal = 0;
		for (const item of this.items) {
			this.subtotal += item.getSubtotal();
		}
	}

	private calculateTaxes () {
		// OCP
		this.taxes = CalculateTaxFactory.create(this.country).calculate(this.subtotal, this.freight, this.protection);
	}

	private calculateTotal () {
		this.total = 0;
		this.total = this.subtotal + this.taxes + this.freight;

	}
	
}