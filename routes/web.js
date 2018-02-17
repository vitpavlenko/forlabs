const express = require('express');
const router = express.Router();

const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "labs/web/");
    },
    filename: function (req, file, callback) {
        callback(null, `${file.originalname}`);
    }
});

const upload = multer({
    storage: Storage,
    limits: { fileSize: 10000000, files: 1 }
}).single('file');

router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return next(err.status = 415);
        }
        console.dir(req.file);
        res.send();
    });
});

const fs = require('fs');

router.get('/', (req, res) => {
    fs.readdir('./labs/web', (err, files) => {
        if (err) {
            console.error(err);
            res.render('error', { err });
        }
        console.log(files);
        res.render('web', {
            vektor: req.session.vektor,
            files
        });
    });
});

module.exports = router;