const express = require('express')
const upload = require('./upload')
const cors = require('cors')

const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, 'uploadResults');

const server = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', upload)

server.get('/upload', function (req, res) {
    // server.get('/listFiles', function (req, res) {
    // Show files in directory
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        var filelist = []
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log('** File: ', file);
            filelist.push(file)
            console.log('** FL: ', filelist)
        });

        console.log(filelist)
        response = {
            file: filelist
        };

        res.end(JSON.stringify(response));
    });
});


server.get('/user', function (req, res) {
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        gender: req.query.gender
    };

    //this line is optional and will print the response on the command prompt
    //It's useful so that we know what infomration is being transferred 
    //using the server
    console.log(response);

    //convert the response in JSON format
    res.end(JSON.stringify(response));
});


server.listen(8000, () => {
    console.log('Server started!')
})
