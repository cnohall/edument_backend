const ObjectId = require('mongodb').ObjectID;
const router = require('express').Router();
const Path = require('../models/path.model');

router.route('/').get((req, res) => {
    
    Path.find()
        .then(path => res.json(path))
        .catch(err => res.status(400).json("Error: " + err));
    // res.status(201).json({message: "You have now fetched the data"});
});

// router.get('/paths',(req, res) => {
//     const searchword = req.params.searchword;
//     Path.find({path: { '$regex' : searchword, '$options' : 'i' } })
//         .then(paths => res.json(paths))
//         .catch(err => res.status(400).json("Error: " + err));
// });

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
    // console.log(req.body)
    // console.log(path)
    Path.find({path: path}, function(err, obj) {
        if (err) throw err;
        else {
            // console.log(obj)
            Path.deleteMany( {path}, function(err, obj) {
                if (err) throw err;
                console.log("deletion completed");
                res.status(200).json({message: "Deletion success"})

            })
        }
      });
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

