const ObjectId = require('mongodb').ObjectID;
const router = require('express').Router();
let Path = require('../models/path.model');

router.route('/').get((req, res) => {
    Path.find()
        .then(path => res.json(path))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post('/paths/:searchword',(req, res) => {
    const searchword = req.params.searchword;
    Path.find({path: { '$regex' : searchword, '$options' : 'i' } })
        .then(paths => res.json(paths))
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

router.post('/delete', (req, res) => { 
    const path = req.body.path;
    Path.findOne({path})
    .then(response => {
        console.log("We found this path: " + response)
        Path.deleteOne( {path}).then(x => {
            console.log(x);
            return res.send("You successfully removed the path")
          })
          .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.post('/update', (req, res) => { 
    // const path = req.body.path;
    // const newPath = new Path({
    //     path,
    // });
    // console.log("Update started");
    // newPath.save()
    //     .then(() => res.json('Path Updated!'))
    //     .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

