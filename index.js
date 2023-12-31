const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.anrbjpf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


  const taskCollection = client.db('jobTask').collection('allTask')


   app.post('/allTask', async(req, res) => {
       const newTask = req.body;
       console.log(newTask);
       const result = await taskCollection.insertOne(newTask);
       res.send(result);
   })


   app.get("/allTask", async (req, res) => {
    const cursor = taskCollection.find()
    const result = await cursor.toArray()
    res.send(result)
  })

  app.get("/allTask/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await taskCollection.findOne(query)
    res.send(result)
  })














    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Job Task Server Running....')
})

app.listen(port,(req, res) => {
    console.log(`Job Task Server is Running On Port: ${port}`);
} )