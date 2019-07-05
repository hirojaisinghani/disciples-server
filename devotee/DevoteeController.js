const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Devotee = require('./Devotee');

// CREATES A NEW Devotee
router.post('/', function (req, res) {
    Devotee.create(req.body,
        function (err, Devotee) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(Devotee);
        });
});

// RETURNS ALL THE Devotees IN THE DATABASE


router.get('/', function (req, res) {
    let condition = {};
    if (req.query.q) {
        const reg = new RegExp(`${req.query.q}`, 'i');
        condition = {
            '$or' : [
                {
                    initiatedName: reg,
                },
                {
                    diacriticsName: reg
                }
                
            ],
        };
    }
    console.log(37, condition);
    const total = Devotee.find(condition).count().exec();
    total.then(count => {
        if (count > 0 ){
            const sortName = req.query._sort;
            const sortBy = req.query._order == 'DESC' ? -1 : 1;
            const perPage = parseInt(req.query._end) - parseInt(req.query._start);
            const pagination = {
                limit: perPage ,
                skip:parseInt(req.query._start)
            }
            const devotee = Devotee.find(condition).sort({[sortName]: sortBy}).limit(pagination.limit).skip(pagination.skip).exec();
            devotee.then((devotees) => {
                res.setHeader('X-Total-Count', count);
                res.status(200).send(devotees);
            });
        } else {
            res.setHeader('X-Total-Count', 0);
            res.status(200).send([]);
        }
    });
});

// GETS A SINGLE Devotee FROM THE DATABASE
router.get('/:id', function (req, res) {

    const devotee = Devotee.findOne({_id: req.params.id}).exec();
    devotee.then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        if (err) return res.status(500).send("There was a problem finding the Devotee.");
    })
});

// DELETES A Devotee FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Devotee.findByIdAndRemove(req.params.id, function (err, Devotee) {
        if (err) return res.status(500).send("There was a problem deleting the Devotee.");
        res.status(200).send("Devotee: "+ Devotee.name +" was deleted.");
    });
});

// UPDATES A SINGLE Devotee IN THE DATABASE
router.put('/:id', function (req, res) {
    Devotee.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Devotee) {
        if (err) return res.status(500).send("There was a problem updating the Devotee.");
        res.status(200).send(Devotee);
    });
});


module.exports = router;