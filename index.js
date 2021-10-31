const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jlnj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('ShowPlaces');
        const placesCollection = database.collection('places');
        // get api

        app.get('/places', async (req, res) => {
            const cursor = placesCollection.find({});
            const places = await cursor.toArray();
            res.send(places);
        })

        //post api
        // app.post('/places', async (req, res) => {
        //     const doc = {
        //         title: "Record of a Shriveled Datu",
        //         content: "No bytes, no problem. Just insert a document, in MongoDB",
        //     }
        //     const result = await placesCollection.insertOne(doc);
        //     console.log(`A document was inserted with the _id: ${result.insertedId}`);
        // })

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})