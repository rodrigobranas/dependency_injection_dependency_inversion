import pgp from "pg-promise";
import Product from "./Product";

export default interface ProductRepository {
	getProduct (productId: number): Promise<Product>;
}

export class ProductRepositoryDatabase implements ProductRepository {
	async getProduct (productId: number) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [productData] = await connection.query("select * from branas.product where product_id = $1", [productId]);
		const product = new Product(productData.productId, productData.description, parseFloat(productData.amount));
		await connection.$pool.end();
		return product;
	}

}
