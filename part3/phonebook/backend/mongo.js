import mongoose from 'mongoose';

if (process.argv.length < 3) {
    console.log('Please provide password as argument!');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://frustratedtaiki:${password}@cluster0.vtdp5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    // show all notes
    console.log('phonebook:');
    Person.find({}).then((res) => {
        res.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then((res) => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
