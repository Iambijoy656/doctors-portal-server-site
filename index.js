const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iyuahvh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOptions')

        const bookingsCollection = client.db('doctorsPortal').collection('bookings')


        // use Aggregate to query multiple collection and then marge data
        app.get('/appointmentOptions', async (req, res) => {
            const date = req.query.date;
            console.log(date)
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            const bookingQuery = { appointmentDate: date }
            const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();


            //carefully
            options.forEach(option => {
                const optionBooked = alreadyBooked.filter(book => book.treatment === option.name)

                const bookedSlots = optionBooked.map(book => book.slot)
                console.log(date, option.name, bookedSlots);
            })


            res.send(options)

        })

        /**
         * API naming Convention
         * app.get('/bookings')
         * app.get('/bookings:id')
         * app.post('/bookings')
         * app.patch('/bookings:id')
         * app.delete('/bookings:id')    
         */


        app.post('/bookings', async (req, res) => {
            const booking = req.body
            const result = await bookingsCollection.insertOne(booking)
            res.send(result)
        })



    }

    finally {

    }

}

run().catch(error => console.error(error))








app.get('/', (req, res) => {
    res.send('doctors portal server is running')
})


app.listen(port, () => {
    console.log(`Doctors portal running on ${port}`);
})