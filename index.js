const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());	

// Use Express
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.epqze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run()  {
	try {
		await client.connect();
		const productCollection =client.db("SportsEnd").collection("product");
		app.get("/products",async(req,res) => {
			const query = {};
			const cursor = productCollection.find(query).limit(6);
			const products = await cursor.toArray();
			res.send(products)
		});
		app.get("/products/:id",async(req,res) => {
			const id = req.params.id;
			const query = {_id:ObjectId(id)};
			const product = await productCollection.findOne(query);
			res.send(product)
		});
		app.put("/products/:id",async(req,res) => {
			const id = req.params.id;
			const filter = {_id:ObjectId(id)};
			const updatedStock = req.body.stock;
			const options = { upsert: true };
			const updateDoc = {
      $set: {
        inStock: updatedStock
      },
    };
    const result = await productCollection.updateOne(filter, updateDoc, options);
    res.send(result)
		});
	}
	finally{}
}
run().catch(console.dir)

app.get("/", (req, res) => {
	res.send("Running perfectly!");
});
app.listen(port, () => {
	console.log("Running from port:", port);
});

