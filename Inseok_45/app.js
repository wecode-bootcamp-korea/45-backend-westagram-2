//필요한 변수들 require을 통해 선언
// const http = require('http'); //used for http communication
const express = require('express'); //enables usage of express framework
const cors = require('cors'); //
const morgan = require('morgan'); //로그들을 보여주는데 개발자만 필요한거니깐 devDepen에 넣어도됨 npm install --save-dev morgan
require('dotenv').config(); //노출되면 안되는 정보를 다른 파일에 실제 값들을 넣어주고 app.js로 불러와서 사용하는 용도

const { DataSource } = require('typeorm'); //getting db through typeORM

const dataSource = new DataSource({  //info for getting access to DB
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

dataSource  //connecting database to server
    .initialize()
    .then(() => {
        console.log("Data source has been initialized!");
    })

const app = express();    //initialize express in the overall variable 'app'
app.use(express.json()); //create Middlewares through app.use();
app.use(cors()); //원래 app.use(cors); 로 쳤는데 왠지 request는 가는데 response가 안와서 middleware로써 cors() 함수 형태로 넣어봤더니 정상 작동 된다
app.use(morgan('dev')); 

app.get('/ping', (req, res) => {    //simple test to see if communication is enabled
    res.status(200).json({ message: "pong" });
});

// const server = http.createServer(app); //creating server
const port = process.env.PORT;  //get port from .env file
const start = async () => {      //open server using `port` variable, and print a message if successfully activated
    app.listen(port, () => console.log(`Server is listening on ${port}`));
};

start();    //start server
