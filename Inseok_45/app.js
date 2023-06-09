require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');
const routes = require('./routes');
const app = express();    
const dataSource = require('./models/dataSource');

app.use(express.json()); 
app.use(cors());
app.use(morgan('dev')); 
app.use(routes);

dataSource
    .initialize()
    .then(() => {
        console.log("Data source has been initialized!");
    }).catch((err) => {
        console.log("Data source Not Initialize : ", err);
            dataSource.destroy();
    });

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'ping' });
});

const port = process.env.PORT;
const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listening on ${port}`));
    } catch (err) {
        console.error(err);
    }
};

start();