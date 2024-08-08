//Modules we used in project
const express = require('express')
const fileUpload = require('express-fileupload')

//Our app
const app = express();

//Middlewares
app.use(fileUpload());

//Upload endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.fileName}`, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error)
        }

        res.json({
            fileName: file.fileName,
            filePath: `/uploads/${file.fileName}`,
        });
    })

})

//Our port
app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});