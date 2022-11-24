const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rgz3uon.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoryCollection = client.db('nextDoor').collection('category');
        const cardInfoCollection = client.db('nextDoor').collection('cardInfo');

        app.get('/category', async (req, res) => {
            if (req.query.brand) {
                const query = { brand: req.query.brand };
                const result = await categoryCollection.find(query).toArray();
                console.log(result);
                res.send(result);
            }
            else {
                const query = {};
                const result = await categoryCollection.find(query).toArray();
                res.send(result);
            }
        })
    }
    finally {

    }
}

run().catch(console.log);





app.get('/', async (req, res) => {
    res.send('nextDoor server is running');
})

app.listen(port, () => console.log(`nextDoor running on ${port}`))