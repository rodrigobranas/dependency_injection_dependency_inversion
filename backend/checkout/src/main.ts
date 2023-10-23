import pgp from "pg-promise";
import axios from "axios";

export async function calculateCheckout (input: any) {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	const response = await axios.get("http://localhost:3000/currencies");
	const currencies = response.data;
	const currency = currencies[input.currency];
	let subtotal = 0;
	const freight = 2.6;
	const protection = 9;
	for (const item of input.items) {
		const [product] = await connection.query("select * from branas.product where product_id = $1", [item.productId]);
		const amount = parseFloat(product.amount);
		const itemAmount = item.quantity * amount;
		subtotal += itemAmount;
	}
	let taxes = 0;
	if (input.country === "BR") {
		if (subtotal + freight + protection > 50) {
			const importTax = ((subtotal + freight + protection) * 0.60); // imposto de importação sobre produto + frete + seguro
			const ICMS = (subtotal + freight + protection + importTax) * 0.17; // ICMS sobre produto + frete + seguro imposto de importação
			taxes = importTax + ICMS;
		} else {
			taxes = (subtotal + freight) * 0.17; // ICMS sobre o produto + frete
		}
	}
	const total = subtotal + taxes + freight;
	await connection.$pool.end();
	return {
		subtotal: Math.round(subtotal * currency * 100)/100,
		taxes: Math.round(taxes * currency * 100)/100,
		total: Math.round(total * currency * 100)/100
	};
}
