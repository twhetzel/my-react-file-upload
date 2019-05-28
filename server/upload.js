const IncomingForm = require('formidable').IncomingForm
const fs = require('fs');

const path = require('path');
const directoryPath = path.join(__dirname, 'upload');

module.exports = function upload(req, res) {
    var form = new IncomingForm()

    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path

        // Try saving example to disk
        console.log("** DP: ", directoryPath)

        let baseDir = path.join(__dirname, '/./uploadResults/');
        console.log('** FP: ', baseDir + file.name)

        fs.open(baseDir + file.name, 'wx', (err, desc) => {
            if (!err && desc) {
                // Save file to Node server
                // https://stackoverflow.com/questions/2496710/writing-files-in-node-js
                // fs.writeFile('/tmp/test', "Hey there!", function (err) {
                // fs.writeFile('./uploadResults/test1234.txt', "Hey there!", function (err) {
                fs.writeFile(baseDir + file.name, "Hey there again!", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!", file.path);
                })
            }
        })
    })

    form.on('end', () => {
        res.json()
    })

    form.parse(req)
}
