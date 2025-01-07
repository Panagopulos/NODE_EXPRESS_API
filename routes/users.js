import express from 'express';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

let users = [];


router.get('/', (req, res) => {

    res.send(users);
});

router.post('/',(req, res) => {
    
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the username ${user.firstName} added to the database!`);

});


router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser)
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id != id);

    res.send(`User with ${id} have been deleted`);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === parseInt(id)); // Ensure `id` is a number

    if (!user) {
        return res.status(404).send(`User with id ${id} not found`);
    }

    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (age) {
        user.age = age;
    }

    res.send(`User with id ${id} has been updated`);
});


export default router