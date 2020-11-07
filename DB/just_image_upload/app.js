const express = require('express');
const router = express.Router();
const multer = require('multer');
var request = require("request");
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
var gridfs = require('gridfs-stream');

/*
  NodeJS Module dependencies.
*/
const { Readable } = require('stream');

/*
  Create Express server && Express Router configuration.
*/
const app = express();
app.use(bodyParser.json()); 
app.use('/images', router);
/*
  Connect Mongo Driver to MongoDB.
*/
let db;

MongoClient.connect('mongodb://localhost:27017', (_err, client) => {
  db = client.db('test');
});



/*
  GET /file/:imageID
*/
router.get('/:imageID', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } 
    
    else if (!req.body.userNum) {
      return res.status(400).json({ message: "No image name in request body" });
    }
    let userNum = req.body.userNum;
    console.log(userNum);
  });

  try {
    var imageID = new ObjectID(req.params.imageID);
    var get_para = req.query;
  } catch (err) {
    return res.status(400).json({ message: "Invalid imageID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
  }
  res.set('content-type', 'image/jpeg');
  res.set('accept-ranges', 'bytes'); 
  
  let userNum = req.body.userNum;
  console.log(req.body);
  console.log(userNum);

  //console.log(get_para['userNum']);
  //let userNum = get_para['userNum'];
  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: userNum  // images -> user
  });

  let downloadStream = bucket.openDownloadStream(imageID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});


/*
  POST /images
*/
router.post('/', (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage});//, limits: { fields: 2, files: 1, parts: 3 }
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } 
    
    else if (!req.body.userNum) {
      return res.status(400).json({ message: "No image name in request body" });
    }
    let userNum = req.body.userNum;
    console.log(userNum);
    
    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: userNum  // change to req.body.user
    });

    let uploadStream = bucket.openUploadStream(userNum);
    let id = uploadStream.id;

    var img_rsc = id;// + '?userNum=' + userNum; 
    var img_url = "http://114.71.220.111:5050/images/" + img_rsc; 
    var options = {
      method: 'POST',
      url: 'http://203.253.128.161:7579/Mobius/ubi_jeong/' + userNum,
      headers:
      {
        'Postman-Token': 'ca169f84-44ea-4d33-a5ac-f4c5d8be1c01',
        'cache-control': 'no-cache',
        'Content-Type': 'application/vnd.onem2m-res+json; ty=4',
        'X-M2M-Origin': '{{aei}}',
        'X-M2M-RI': '12345',
        Accept: 'application/json'
      },
      body: '{"m2m:cin": { "rn": "' + img_url + '", "con": "' + "metadata" + '"} }'
    };

    readableTrackStream.pipe(uploadStream);
    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      console.log(id);
      
      // post to mobius
      request(options, function (error, _response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
      
      return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });
  });
});

app.listen(5050, () => {
  console.log("App listening on port 5050!");
});