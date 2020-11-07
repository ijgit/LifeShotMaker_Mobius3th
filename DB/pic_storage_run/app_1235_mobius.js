const express = require('express');
const router = express.Router();
const multer = require('multer');
var request = require("request");
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
var gridfs = require('gridfs-stream');
var fs = require("fs");

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
  GET /file/:obj
*/
router.get('/:cnt', (req, res) => {
  try {
    var cnt = req.params.cnt;
    var get_para = req.query;
    var obj = new ObjectID(get_para['obj']);
  } catch (err) {
    return res.status(400).json({ message: "Invalid obj in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
  }
  res.set('content-type', 'image/jpeg');
  res.set('accept-ranges', 'bytes'); 
  
  
  //let cnt = get_para['cnt'];
  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: cnt  // images -> user
  });

  let downloadStream = bucket.openDownloadStream(obj);

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
    console.log(req.body);
    let cnt = req.body.cnt;
    console.log(cnt)
    if (!req.body.cnt) {
      return res.status(400).json({ message: "No image name in request body" });
    }
    
    
    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: cnt  // change to req.body.user
    });

    let uploadStream = bucket.openUploadStream(cnt);
    let id = uploadStream.id;
    

    var img_rsc = cnt + '?obj=' + id; 
    var img_url = "http://114.71.220.111:1235/images/" + img_rsc; 


    var info = {
        "url": img_url,
        "date": "xxxx-xx-xx",
        "type": "xxxx",
        "gps": "xxxxx.xxxx,xxxxx.xxxx"
    };
    info = JSON.stringify(info);
    console.log(info);

    
    var options = {
      method: 'POST',
      url: 'http://203.253.128.161:7579/Mobius/lsm/' + cnt,
      headers:
      {
        'Postman-Token': 'ca169f84-44ea-4d33-a5ac-f4c5d8be1c01',
        'cache-control': 'no-cache',
        'Content-Type': 'application/vnd.onem2m-res+json; ty=4',
        'X-M2M-Origin': '{{aei}}',
        'X-M2M-RI': '12345',
        Accept: 'application/json'
      },
      body: '{"m2m:cin": { "con": ' + info + '} }'
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
        console.log(body);  //m 
      });
      
      return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });
  });
});

app.listen(1235, () => {
  console.log("App listening on port 1235!");
});