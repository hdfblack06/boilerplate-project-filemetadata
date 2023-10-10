var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
//get multer
var multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



//INSERT NEW FILE
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  if(!req.file){return res.status(400).json({ message: 'No file uploaded' });}
  
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const fileSize = Number(req.file.size);
  res.json({ name: fileName, type: fileType, size: fileSize });
})



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
