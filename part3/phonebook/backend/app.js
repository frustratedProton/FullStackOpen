import express from 'express';
import morgan from 'morgan';
import Person from './models/Person.js';
const app = express();

// phonebook json
let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('tiny'))

morgan.token('body', (req) => {
    // console.log(req.body)
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '-';
});

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => res.json(persons));
});

app.get('/info', (req, res) => {
    const personsLength = persons.length;
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    });

    res.send(`
        <p> Phonebook has info about ${personsLength} people.</p>
        <p>${formattedTime} (Indian Standard Time)</p>
        `);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    // const foundPerson = persons.find((person) => person.id === id);

    // if (!foundPerson) {
    //     res.status(404).json({ message: 'person not found' });
    // }

    Person.findById(id).then((person) => res.json());

    // res.status(200).send(foundPerson);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const initialLength = persons.length;
    persons = persons.filter((person) => person.id !== id);

    if (persons.length === initialLength) {
        res.status(404).json({ message: 'person not found' });
    }

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    const generateId = () => Math.floor(Math.random() * 10000);

    if (!name || !number) {
        res.status(400).json({ error: 'Name or Number is missing' });
    }

    const nameExists = persons.some((person) => person.name === name);
    if (nameExists) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    const newPerson = {
        id: generateId(),
        name,
        number,
    };

    persons = [...persons, newPerson];

    res.status(201).json(newPerson);
});

app.listen(3000, () => {
    console.log('App running at port 3000');
});
