import axios from "axios";

export default interface CurrencyGateway {
	getCurrency (currency: string): Promise<number>;
}

export class CurrencyGatewayHttp implements CurrencyGateway {

	async getCurrency (currency: string): Promise<number> {
		const response = await axios.get("http://localhost:3000/currencies");
		const currencies = response.data;
		return currencies[currency];
	}
}
