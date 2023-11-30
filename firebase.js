// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCzWuohjwOLB9nVGVEtNqxPmK_7iou9vLk",
//   authDomain: "greenbiz-11173.firebaseapp.com",
//   projectId: "greenbiz-11173",
//   storageBucket: "greenbiz-11173.appspot.com",
//   messagingSenderId: "1005126435066",
//   appId: "1:1005126435066:web:89f96474b19994c5614943",
//   measurementId: "G-0YFJRN4BWP"
// };

// Initialize Firebase
// const admin=require('firebase-admin');
// var serviceAccount = require("./greenbiz-11173-firebase-adminsdk-xajsm-e8f6f0b74c.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// // admin.initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// const express=require('express');

// const cors=require('cors');

// const app = express();
// const port = 3000;









// // Firestore database reference
// const db = admin.firestore();

// // Middleware to parse JSON in the request body
// app.use(express.json());
// app.use(cors());

// // Endpoint to store data in Firestore
// app.post('/api/storeData', async (req, res) => {
//   try {
//     const data = req.body;

//     // Add data to Firestore
//     const docRef = await db.collection('DEMO').add(data);

//     res.json({ message: 'Data stored successfully!', docId: docRef.id });
//   } catch (error) {
//     console.error('Error storing data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const app = express();
const cors=require('cors');
app.use(cors());

// Initialize Firestore admin
const serviceAccount = require('./greenbiz-11173-firebase-adminsdk-xajsm-e8f6f0b74c.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Endpoint to handle adding data to various collections
app.post('/api/addData', async (req, res) => {
  try {
    const { collection, name, phone } = req.body;

    if (!collection || !name || !phone) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    let docRef;

    // Determine the collection and add data accordingly
    switch (collection) {
      case 'DEMO':
        docRef = await db.collection('DEMO').add({ name, phone });
        break;
      case 'COLLECTION_1':
        docRef = await db.collection('COLLECTION_1').add({ name, phone });
        break;
      case 'COLLECTION_2':
        docRef = await db.collection('COLLECTION_2').add({ name, phone });
        break;
      // Add more cases for other collections if needed
      default:
        return res.status(400).json({ error: 'Invalid collection name' });
    }

    res.json({ message: `Data stored successfully in ${collection} collection!`, docId: docRef.id });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
