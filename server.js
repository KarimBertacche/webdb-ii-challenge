const express = require('express');

const db = require('./data/dbConfig');


function getAllCars() {
    return db('cars');
}

function getCarById(id) {
    return db('cars').where({ id });
}

function insertNewCar(car) {
    return db('cars').insert(car);
}

function updateCar(id, changes) {
    return db('cars').where({ id }).update(changes);
}

function deleteCar(id) {
    return db('cars').where({ id }).del();
}

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server working!!');
});

server.get('/api/cars', async (req, res) => {
    try {
        const cars = await getAllCars();

        res.status(200).json(cars);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the cars'
        });
    }
});

server.get('/api/cars/:id', validateId, async (req, res) => {
    res.status(200).json(req.car);
});

server.post('/api/cars', validateBody, async (req, res) => {
    try {
        const newCar = await insertNewCar(req.body);

        res.status(201).json(newCar);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating new car'
        });
    }
});

server.put('/api/cars/:id', [ validateBody, validateId ], async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedCar = await updateCar(id, changes);

        if(updatedCar) {
            res.status(200).json(updatedCar);
        } else {
            res.status(404).json({
                message: 'Could not apply changes to the specified id'
            });
        }
    } catch {
        res.status(500).json({
            message: 'Server error while updating car'
        });
    }
});

server.delete('/api/cars/:id', validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await deleteCar(id);

        if (deletedCar){
            res.status(204).end()
        } else {
            res.status(404).json({
                message: 'The car with the specified id could not be deleted'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while deleting car'
        });
    }
});

async function validateId(req, res, next) {
    try {
        const { id } = req.params;

        if(!isNaN(parseInt(id))) {
            const car = await getCarById(id);
            if(car) {
                req.car = car;
                next();
            } else {
                res.status(404).json({
                    message: 'Could not find the car by the id requested'
                });
            }
        } else {
            res.status(404).json({
                message: 'Id is not a valid number'
            });
        }
        
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the car by id'
        });
    }
}

function validateBody(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        next();
    } else {
        res.status(404).json({
            message: 'All keys in the request body are required'
        });
    }
}

module.exports = server;