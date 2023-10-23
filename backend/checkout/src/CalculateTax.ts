export default interface CalculateTax {
	calculate (subtotal: number, freight: number, protection: number): number;
}

export class CalculateTaxBR implements CalculateTax {

	calculate(subtotal: number, freight: number, protection: number): number {
		let taxes = 0;
		if (subtotal + freight + protection > 50) {
			const importTax = ((subtotal + freight + protection) * 0.60); // imposto de importação sobre produto + frete + seguro
			const ICMS = (subtotal + freight + protection + importTax) * 0.17; // ICMS sobre produto + frete + seguro imposto de importação
			taxes = importTax + ICMS; // 92% ou mais
		} else {
			taxes = (subtotal + freight) * 0.17; // ICMS sobre o produto + frete
		}
		return taxes;
	}
}

export class CalculateTaxFactory {
	static create (country: string): CalculateTax {
		if (country === "BR") return new CalculateTaxBR();
		throw new Error("");
	}
}