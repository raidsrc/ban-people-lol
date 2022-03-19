import { MongoClient } from "mongodb";
const connectionString = process.env.ATLAS_URI

const client = new MongoClient(connectionString);
// let dbConnection;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       if (err || !db) {
//         return callback(err);
//       }

//       dbConnection = db.db("database-1");
//       console.log("Successfully connected to MongoDB.");

//       return callback();
//     });
//   },

//   getDb: function () {
//     return dbConnection;
//   },
// };

async function run() {
  try {
    await client.connect();

    const database = client.db("bpl-all-users");
    const movies = database.collection('unbanned-users');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);