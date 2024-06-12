const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const router = require('./src/routes/router')


const app = express()
const port = process.env.PORT || 5000 



const corsOptions = {
    origin: '*',
    Credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/wastetotaste', router)

app.get('/', (req, res) => {
    res.send('You are in the wastetotaste backyard')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})