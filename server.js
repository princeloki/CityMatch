

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { exec } = require('child_process');
const dJSON = require('dirty-json');

require('dotenv/config')

const app = express()

// app.use(cors({
//     origin: 'http://127.0.0.1:5173',
//     optionsSuccessStatus: 200
//   }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist','index.html'));
})

app.post("/cities", (req, res) => {
    const scriptPath = path.join(__dirname,'computation','k-means','trainer.py');
    const col = parseInt(req.body.total);
    const rent = parseInt(req.body.rent);
    const country = req.body.country ? req.body.country : "none";
    exec(`python ${scriptPath} ${col} ${rent} ${country}`,(error, stdout, stderr) => {
        if(error){
            console.error(`exec error: ${error}`);
            return res.status(500).send('An error occurred')
        }
        res.send({message:"Success",data: dJSON.parse(stdout)})
        console.error(`exec error: ${stderr}`);
        console.log("Json sent successfully")
    })
})

app.listen(process.env.PORT,()=>{
    console.log("listening on port " + process.env.PORT);
})