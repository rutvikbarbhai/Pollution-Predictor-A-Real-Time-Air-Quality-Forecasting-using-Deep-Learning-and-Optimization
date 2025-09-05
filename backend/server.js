const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


async function loadCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
              //console.log(data);
              results.push(data)})
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
  }
app.get('/data', async (req, res) => {
    let data = [];
   data=await loadCSV('C:\\Users\\Ankit\\Documents\\AI_MiniProject\\data_codes\\11_values_2015.csv');
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});