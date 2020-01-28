const ObjectId = require('mongodb').ObjectID;
const router = require('express').Router();
const Path = require('../models/path.model');

router.route('/').get((req, res) => {
    
    Path.find()
        .then(path => res.json(path))
        .catch(err => res.status(400).json("Error: " + err));
    // res.status(201).json({message: "You have now fetched the data"});
});

router.get('/find/*', (req, res) => { 
    const path = req.params[0];
    try {
        Path.find( {path: { '$regex' : path, '$options' : 'i' }}, function(err, obj) {
            res.json(obj)
        })
    } catch (e) {
        console.log(e)
    }
});

router.post('/update', (req, res) => { 
    const data = req.body.data;
    try {
        Path.update(
            {_id: data._id},
            {$set: {path: data.path}},
            function(err, obj) {
                res.json(obj)
            })            
    } catch (e) {
        console.log(e)
    }
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
    const data = req.body.data;
    try {
        Path.delete(
            {_id: data._id},
            function(err, obj) {
                res.json(obj)
            })            
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;

