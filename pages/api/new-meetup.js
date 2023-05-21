// /api/new-meetup
// POST /api/new-meetup

import { MongoClient, ServerApiVersion } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const mongodbURI =
      "mongodb+srv://habohsu930mongodb:GSTsokgyWawejPBc@meetup-cluster-0.dy9ziyv.mongodb.net/meetups?retryWrites=true&w=majority";
    const mongoClient = await MongoClient.connect(mongodbURI);
    const db = mongoClient.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    mongoClient.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
