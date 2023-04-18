require('dotenv').config();

const morgan = require ('morgan');
const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res, next){
    return res.status(200).json({message: 'pong'})
});

app.post('/users/signup', async function (req, res) {
    const { email, password, name, age, phone_number } = req.body

    await dataSource.query(`
        INSERT INTO users (
            email,
            password,
            name,
            age,
            phone_number
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `,[email, password, name, age, phone_number])

    res.status(201).json({message: 'userCreated'})
});

const PORT = process.env.PORT;

const start = async () => {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start()