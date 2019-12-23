const ObjectId = require('mongodb').ObjectID;
const router = require('express').Router();
let Path = require('../models/path.model');

router.route('/').get((req, res) => {
    Path.find()
        .then(path => res.json(path))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post('/add', (req, res) => { 
    const path = req.body.path;
    const newPath = new Path({
        path,
    });
    console.log("added");
    newPath.save()
        .then(() => res.json('Path added!'))
        .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;

