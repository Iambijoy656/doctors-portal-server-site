const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://<username>:<password>@cluster0.iyuahvh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });








app.get('/', (req, res) => {
    res.send('doctors portal server is running')
})


app.listen(port, () => {
    console.log(`Doctors portal running on ${port}`);
})