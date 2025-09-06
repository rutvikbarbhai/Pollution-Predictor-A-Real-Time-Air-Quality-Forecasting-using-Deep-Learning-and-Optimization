
# <img src="https://github.com/user-attachments/assets/b83b271d-fafe-41be-bf84-7f74ccb310d1" alt="logo" height="30px">  Pollution-Predictor : A Real Time Air Quality Forecasting using Deep Learning & Optimization


##  <img src="https://github.com/user-attachments/assets/f3dcee8e-e008-457a-97fb-d3848b425713" height="30px" style="vertical-align:text-bottom;"> Project Structure

```bash
📁 frontend/  
├── index.html         # Main landing page of the project  
├── index1 (1).html    # Alternate/experimental homepage 
├── jaya.html          # Page explaining the Jaya algorithm 
├── jaya_pred.html     # Prediction page powered by Jaya optimization
├── results.html       # Displays results and visualizations
├── script.js          # JavaScript logic for dynamic behavior 
├── styles.css         # CSS styles for the web pages  
└── README.md          #  Documentation (this file)
           
```
---

## <img src="https://github.com/user-attachments/assets/6672ee8c-15ed-4fb5-9cd5-63c04ac747c1" height="24px" style="vertical-align: bottom; margin-right: 10px;">  Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari).  
- *(Optional)* A local server if you want to fetch live data (`http://localhost:3000/data`).  

---

## <img src="https://github.com/user-attachments/assets/4432b39f-259d-4928-b0ca-7b444cf7f4ff" width="25px" /> Running the Project

### Option 1: Quick Start (Static Files)
1️⃣ Download or clone this repository:
   ```bash
   git clone <Pollution-Predictor-A-Real-Time-Air-Quality-Forecasting-using-Deep-Learning-and-Optimization>
   cd <frontend>
   ```
2️⃣ Double-click index.html to open it in your browser.
This works if you only want to explore the UI or static charts.

### Option 2: Run with Local Server (Recommended)


### Using Python
1️⃣ If your project fetches data from an API (e.g., http://localhost:3000/data), run a local server.
   ```bash
# For Python 3
python -m http.server 8080
  ```

### Using Node.js (http-server)
 ```bash
npm install -g http-server
http-server
  ```

## 📊 Usage

- Open `index.html` to view the main application.  
- Navigate to `jaya.html`, `jaya_pred.html`, or `results.html` for algorithm details, predictions, and results.  
- Visualizations (line charts, heatmaps) will display if the dataset/API is available.  

---

## 🔮 Notes

- If you want **real-time predictions**, ensure a backend API serves data in JSON format at `http://localhost:3000/data`.  
- Without a backend, you can still explore the interface using static or mock data.  

---

## 📚 References

1. G. Chen et al., *Hybrid Deep Learning Prediction*, Scientific Report, 2025.  
2. S. Dey et al., *Apict: Air Pollution Epidemiology Using Green AQI Prediction During Winter Seasons in India*, IEEE Trans. Sustainable Computing, 2024.  
3. A. Mittal et al., *Advancements in Air Pollution Prediction and Classification Models*, ICACCS, 2024.  
4. M. Srbinovska et al., *Study on Air Pollution Prediction in North Macedonia*, IcETRAN, 2024.  
5. A. Nakhjiri & A. A. Kakroodi, *Air Pollution in Industrial Clusters*, Ecological Informatics, 2024.  
6. J. Vachon et al., *ML Methods for Ambient Air Pollutants with High Spatial Contrast*, Environmental Research, 2024.  





