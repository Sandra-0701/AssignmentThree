const express = require('express');
const router = express.Router();
const fs = require('fs');
const hospitalsPath = './hospitalData.json';

// Get all hospitals
router.get('/', (req, res) => {
    fs.readFile(hospitalsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Error reading hospitals'});
        } else {
            const hospitals = JSON.parse(data);
            res.send(hospitals);
        }
    });
});

// Add a new hospital
router.post('/add', (req, res) => {
    fs.readFile(hospitalsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Error reading hospitals'});
        } else {
            const hospitals = JSON.parse(data);
            hospitals.push(req.body);
            fs.writeFile(hospitalsPath, JSON.stringify(hospitals), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({message: 'Error writing hospitals'});
                } else {
                    res.send({message: 'Hospital added', hospitals});
                }
            });
        }
    });
});

// Update an existing hospital
router.put('/edit', (req, res) => {
    fs.readFile(hospitalsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Error reading hospitals'});
        } else {
            const hospitals = JSON.parse(data);
            const index = hospitals.findIndex(hospital => hospital.name === req.body.name);
            if (index !== -1) {
                hospitals[index] = req.body;
                fs.writeFile(hospitalsPath, JSON.stringify(hospitals), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send({message: 'Error writing hospitals'});
                    } else {
                        res.send({message: 'Hospital updated', hospitals});
                    }
                });
            } else {
                res.status(404).send({message: 'Hospital not found'});
            }
        }
    });
});

// Delete a hospital
router.delete('/remove', (req, res) => {
    fs.readFile(hospitalsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Error reading hospitals'});
        } else {
            const hospitals = JSON.parse(data);
            const index = hospitals.findIndex(hospital => hospital.name === req.body.name);
            if (index !== -1) {
                hospitals.splice(index, 1);
                fs.writeFile(hospitalsPath, JSON.stringify(hospitals), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send({message: 'Error writing hospitals'});
                    } else {
                        res.send({message: 'Hospital deleted', hospitals});
                    }
                });
            } else {
                res.status(404).send({message: 'Hospital not found'});
            }
        }
    });
});

module.exports = router;