const express = require('express');

const db = require('./data/dbConfig');

function getAllCars() {
    return db('cars');
}

function getCarById(id) {
    return db('cars').where({ id });
}

const server = express();

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

server.get('/api/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const car = await getCarById(id);

        if(car) {

        } else {
            res.status(404).json({
                message: 'Could not find the car id requested'
            });
        }
    } catch(error) {

    }
});

module.exports = server;