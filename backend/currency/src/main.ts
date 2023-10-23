import express from "express";
const app = express();
app.get("/currencies", function (req, res) {
	res.json({
		USD: 1,
		BRL: 5.3332,
		EUR: 0.94
	})
})
app.listen(3000);
