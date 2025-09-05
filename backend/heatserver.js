const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access backend

const PORT = 3000;

// Load and process CSV file
app.get("/data", (req, res) => {
    let results = [];

    fs.createReadStream("11_values_2015.csv")
        .pipe(csv())
        .on("data", (row) => {
            results.push({
                timestamp: row.timestamp,
                AQI: +row.AQI,
                pm25_value: +row.pm25_value,
                pm10_value: +row.pm10_value
            });
        })
        .on("end", () => {
            res.json(results);
        });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
