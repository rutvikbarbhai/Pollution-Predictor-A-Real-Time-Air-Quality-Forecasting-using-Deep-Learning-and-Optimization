// Import necessary libraries

const express = require("express");
var cors = require('cors');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const csv = require('csv-parser');
  
const app = express();
app.use(cors());
app.use(express.json());

const mysql =require("mysql2");

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root12",
  database: "dbs_project",
});

// post request

app.get("/users/:uname/:email/:password/:location_pref", async (req, res) => {
  
  console.log("Start");
  try {
    
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO user_data ( user_name, email, password, location_preferences) 
          VALUES (?,?,?,?)`,
      [ req.params.uname, req.params.email, req.params.password, req.params.location_pref]
    );
    res.status(202).json({
      message: "User Created",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from user_data;`);
    res.status(200).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/user/:uname", async (req, res) => {
  try {
    const { uname } = req.params;
    const data = await connection
      .promise()
      .query(`SELECT *  from user_data where user_name = ?`, [uname]);
    res.status(200).json({
      user: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, location_pref } = req.body;
    const update = await connection
      .promise()
      .query(
        `UPDATE user_data set user_name = ?, email = ?, password = ?, location_preferences= ? where id = ?`,
        [ user_name, email, password, location_pref, id]
      );
    res.status(200).json({
      message: "updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const update = await connection
        .promise()
        .query(
          `DELETE FROM  user_data where id = ?`,
          [id]
        );
      res.status(200).json({
        message: "deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });

   app.get("/locations", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT location_id, location_name  from location_data;`);
    res.status(200).json(
        data[0]
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/location/:city", async (req, res) => {
    try {
      const { city } = req.params;
      const data = await connection.promise().query("SELECT location_id, location_name  from location_data where city like ?", [city]);
      res.status(200).json(
        data[0]
      );
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });


 app.get("/states", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT distinct state  from location_data;`);
    res.status(200).json(
        data[0]
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/city/:state", async (req, res) => {
  try {
	
	const { state } = req.params;
		  
    const data = await connection.promise().query("SELECT distinct city from location_data where state = ?",[state]);
    res.status(200).json(
        data[0]
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/location_name/:location_id", async (req, res) => {
  try {
	
	const { location_id } = req.params;
		  
    const data = await connection.promise().query("SELECT CONCAT(location_name,' ',state) as location_name from location_data where location_id = ?",[location_id]);
    res.status(200).json(
        data[0]
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/pollution_history/:location_id", async (req, res) => {
  try {
	
	const { location_id } = req.params;
  console.log("Location ID:"+location_id); 
    const data = await connection.promise().query("SELECT DATE_FORMAT(timestamp, '%d-%m') as timestamp, measured_value  from historical_data where DATE_FORMAT(timestamp, '%Y') = '2019'  and location_id = ? order by CONVERT(DATE_FORMAT(timestamp, '%j'),UNSIGNED INTEGER)",[location_id]);
    //console.log(data[0]);
    res.status(200).json(
        data[0]
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
app.get("/pollution_data_download/:city", async (req, res) => {
  try {
	
	const { city } = req.params;
		  
    const data = await connection.promise().query("SELECT location_data.state , location_data.City , location_data.location_name , DATE_FORMAT(historical_data.timestamp, '%Y-%m-%d') as timestamp, historical_data.measured_value as PM_2dot5_Value from historical_data, location_data where historical_data.location_id = location_data.location_id and location_data.city = ? order by timestamp",[city]);
    res.status(200).json(
        data[0]
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
app.get("/data", async (req, res) => {
  let data = [];
  data=await loadCSV('C:\\Users\\Ankit\\Documents\\AI_MiniProject\\data_codes\\final_values.csv');
   res.json(data);
});
app.get("/pollution_prediction", async (req, res) => {
  try {
	
    const { location_id } = req.params;
        
      const data = await connection.promise().query("SELECT DATE_FORMAT(timestamp, '%d-%m') as timestamp, predicted_value  from prediction_data where DATE_FORMAT(timestamp, '%Y') = '2024' order by CONVERT(DATE_FORMAT(timestamp, '%j'),UNSIGNED INTEGER)");
    //  console.log(data[0]);
      res.status(200).json(
          data[0]
      );
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
});


// Function to load CSV data
async function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            console.log(data);
            results.push(data)})
          .on('end', () => resolve(results))
          .on('error', (err) => reject(err));
  });
}
async function getData(loc_id) {
  
  try {
        
      const data = await connection.promise().query("SELECT cast(Substring(location_id,3,5) as Unsigned) as stn_code, DATE(timestamp) as timestamp, measured_value as pm_25  from historical_data where location_id = ?",[loc_id]);
    
    const data2 = [];
    for (var i = 0; i < data.length; i++) {
      var currentVal = data[i];      
      data2.push(currentVal);
    }
      return data2[0];
    } catch (err) {
      console.log("Error fetching data:"+err);
    }
 
 
}
app.get("/train_model/:location_id", async (req, res) => {
  const { location_id } = req.params;
  console.log("Stating tensorflow training");
  try {
// Load the dataset
//const filePath = 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/pm_25.csv';
//const data = await loadCSV(filePath);
const data = await getData(location_id);  
console.log("Loaded Data" +data[0].timestamp+data[0].stn_code+data[0].pm_25);
// Convert timestamp to datetime if necessary and process data
const timestamps = data.map(row => new Date(row.timestamp).getTime() / 1000);
const stnCodes = data.map(row => parseInt(row.stn_code));
const targets = data.map(row => parseFloat(row.pm_25));
console.log("Location Data" + stnCodes[0]);
console.log("Pollution Data" + targets[0]);
console.log("Timestamp Data" + timestamps[0]);

// Prepare features and targets
const features = tf.tensor2d(stnCodes.map((code, i) => [code, timestamps[i]]));
const labels = tf.tensor1d(targets);
console.log("Features and Labels");
// Normalize the data
const [trainFeatures, testFeatures, trainLabels, testLabels] = tf.tidy(() => {
    const [trainXs, testXs] = tf.split(features, [Math.floor(0.8 * features.shape[0]), Math.ceil(0.2 * features.shape[0])]);
    const [trainYs, testYs] = tf.split(labels, [Math.floor(0.8 * labels.shape[0]), Math.ceil(0.2 * labels.shape[0])]);
    
    const featureMin = trainXs.min(0);
    const featureMax = trainXs.max(0);
    
    const normalizedTrainXs = trainXs.sub(featureMin).div(featureMax.sub(featureMin));
    const normalizedTestXs = testXs.sub(featureMin).div(featureMax.sub(featureMin));
    
    return [normalizedTrainXs, normalizedTestXs, trainYs, testYs];
});
console.log("Data Normalized");
// Reshape the data to fit the 1D CNN model
const reshapedTrainFeatures = trainFeatures.reshape([trainFeatures.shape[0], 1, trainFeatures.shape[1]]);
const reshapedTestFeatures = testFeatures.reshape([testFeatures.shape[0], 1, testFeatures.shape[1]]);
console.log("Reshaped Data");
// Build the 1D CNN model
const model = tf.sequential();

model.add(tf.layers.conv1d({inputShape: [1, reshapedTrainFeatures.shape[2]], filters: 1, kernelSize: 1, activation: 'relu'}));

model.add(tf.layers.maxPooling1d({poolSize: 1}));

model.add(tf.layers.conv1d({filters: 1, kernelSize: 1, activation: 'relu'}));

model.add(tf.layers.maxPooling1d({poolSize: 1}));

model.add(tf.layers.flatten());

model.add(tf.layers.dense({units: 128, activation: 'relu'}));

model.add(tf.layers.dropout({rate: 0.5}));

model.add(tf.layers.dense({units: 1}));
console.log("Build Model");
// Compile the model
model.compile({
    loss: 'meanSquaredError',
    optimizer: 'adam',
    metrics: ['mae']
});
console.log("Compiled model");
// Train the model
await model.fit(reshapedTrainFeatures, trainLabels, {
    epochs: 5,
    batchSize: 32,
    validationData: [reshapedTestFeatures, testLabels],
});
console.log("trained model");
// Save the model
await model.save('file://pm25_cnn_model');
console.log("Saved model");
res.status(200).json({
  message: "Success",
} );
} catch (err) {
  console.log("Error:" + err);
  res.status(500).json({
    message: err,
  });
}
});

    // Load the saved model
async function loadModel(modelPath) {
      return await tf.loadLayersModel(`file://${modelPath}`);
    }
    var predict_data = [0,0];
    var totalFeatures =0;
app.get("/predict_model/:location_id", async (req, res) => {
  const { location_id } = req.params;
  console.log("Stating tensorflow prediction");
try {

// Load new data for prediction
//const newFilePath = 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/pm_25_new.csv';  // Use the relative path to DGLocation.csv
//const newData = await loadCSV(newFilePath);
const newData = await getData(location_id);  
// Preprocess new data
const newTimestamps = newData.map(row => new Date(row.timestamp).getTime() / 1000);
const newStnCodes = newData.map(row => parseInt(row.stn_code));

// Prepare features
const newFeatures = tf.tensor2d(newStnCodes.map((code, i) => [code, newTimestamps[i]]));

// Normalize the new data
const scalerMin = tf.tensor1d([0, 0]); // Replace with actual min values used during training
const scalerMax = tf.tensor1d([1, 1]); // Replace with actual max values used during training
const normalizedNewFeatures = newFeatures.sub(scalerMin).div(scalerMax.sub(scalerMin));

// Reshape the new data to fit the 1D CNN model
const reshapedNewFeatures = normalizedNewFeatures.reshape([normalizedNewFeatures.shape[0], 1, normalizedNewFeatures.shape[1]]);

// Load the model
const model = await loadModel('./pm25_cnn_model/model.json');  // Use the relative path to model.json

// Make predictions
const predictions = model.predict(reshapedNewFeatures);

// Print predictions
predictions.array().then(array => {
  totalFeatures = array.length;
  var sql = "DELETE from prediction_data";
   connection.query(sql, function (err, result) {
    if (err) throw err;
      console.log("All records deleted from prediction_data");
  });
  for (let i = 0; i < totalFeatures; i++) {
   
   if(array[i] != 'NaN'){
   var sql = "INSERT INTO prediction_data (location_id, timestamp, pollutant_type,predicted_value) VALUES ('DL001', FROM_UNIXTIME("+newTimestamps[i]+"+157680000), 'PM_25',"+array[i]+")";
   connection.query(sql, function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");
  });
  } 
  }
});
console.log("Success");
res.status(200).json({
  message: "Success",
} );

  } catch (err) {
    console.log("Error:" + err);
    res.status(500).json({
      message: err,
    });
  }
  });
app.listen(5000, () => {
  console.log("Server listening in http://localhost:5000");
});