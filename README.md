# <img src="https://github.com/user-attachments/assets/b83b271d-fafe-41be-bf84-7f74ccb310d1" alt="logo" height="30px"> Pollution-Predictor: A Real-Time Air Quality Forecasting using Deep Learning and Optimization


## <img src="https://github.com/user-attachments/assets/43c950fd-76fc-4a81-804b-57e89642eb8c" alt="overview" height="30px"> Overview
This research project focuses on the prediction of **environmental pollution** levels—specifically air quality, **PM2.5 concentration**, and temperature-driven pollution dynamics—through the use of historical environmental datasets.
To enhance predictive performance, the study employs the **Jaya Optimization Algorithm**, which is utilized to fine-tune machine learning models. The algorithm improves both accuracy and stability of predictions while maintaining computational efficiency.

Unlike conventional optimization techniques, **Jaya is parameter-independent**, eliminating the need for algorithm-specific control parameters. This simplicity, coupled with its robustness, makes Jaya particularly well-suited for real-world environmental prediction tasks.

The proposed framework demonstrates potential as a scalable and adaptable solution for pollution forecasting, contributing to applications in environmental monitoring, smart city infrastructure, and evidence-based policymaking.


## <img src="https://github.com/user-attachments/assets/dcdcffb4-c4e2-40ee-84cc-aca8612d257e" height="30px" style="vertical-align: text-bottom; margin-bottom:-3050px;">Features  
- 📊 Predicts pollution levels using historical datasets  
- ⚡ Optimized with **Jaya Optimization Algorithm** for enhanced accuracy  
- 🌐 Built with **TensorFlow.js** for real-time, browser-based predictions  
- 📈 Scalable to different pollution datasets (**air, water, noise, etc.**)  
- 🔮 Useful for **environmental monitoring, smart cities, and decision-making**  


## <img src="https://github.com/user-attachments/assets/f3dcee8e-e008-457a-97fb-d3848b425713" height="30px" style="vertical-align:text-bottom;"> Repository Structure  
```bash
📂 ML-Research-Project/
│   ├── requirements.txt
│   ├── package.json      
│   ├── package-lock.json         
│   └── .gitignore
│ 
├── 📁 backend/           
├── 📁 data/              
├── 📁 frontend/      
├── 📁 notebook/      
├── 📁 paper_sections/     
├── 📁 presentation/              
├── 📁 report/           
├── 📁 results/
├── 📁 src/          
└── README.md            
```
## <img src="https://github.com/user-attachments/assets/612137fd-b2de-411c-acd7-f94c4811e9f2" height="25px" style="vertical-align:text-bottom;">Tech Stack
**Languages:** Python, JavaScript  
**Frameworks/Libraries:** TensorFlow.js, Scikit-learn  
**Optimization:** Jaya Algorithm  
**Visualization:** Matplotlib, D3.js  


---

## <img src="https://github.com/user-attachments/assets/6672ee8c-15ed-4fb5-9cd5-63c04ac747c1" height="24px" style="vertical-align: bottom; margin-right: 10px;"> Installation & Setup  

This project has **two main components**:  

1. **Python (Machine Learning Research)** – for data preprocessing, analysis, and model training.  
2. **Node.js (Web Application with TensorFlow.js)** – for serving the frontend and enabling real-time predictions.


### 1️⃣ Clone the Repository   
```bash
git clone https://github.com/rutvikbarbhai/Pollution-Predictor-A-Real-Time-Air-Quality-Forecasting-using-Deep-Learning-and-Optimization.git
cd Pollution-Predictor-A-Real-Time-Air-Quality-Forecasting-using-Deep-Learning-and-Optimization
```
## <img src="https://github.com/user-attachments/assets/72050623-de79-4b7a-b803-4a1154885382" width="35px" alt="Python Setup (Machine Learning Research)">Python Setup (Machine Learning Research)

```bash
1️⃣ Create a Virtual Environment
python -m venv venv

2️⃣ Activate the Environment 
venv\Scripts\activate  

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Run ML Scripts
python src/roc_plot.py
```
## <img src="https://github.com/user-attachments/assets/657aedce-259b-411c-89f2-0d93f7049737" alt="nodejs" height="20px"> Node.js Setup
```bash
1️⃣ Install Dependencies
npm install

2️⃣ Start the Server
node backend/server.js 

3️⃣  Open in Browser
http://localhost:3000
```


## 👨‍🔬 Inventors
 
- **Dr. Tusar Kanti Mishra**  
  Associate Professor  
  Computer Science and Engineering Department  
  Manipal Institute of Technology, Bengaluru  
  Manipal Academy of Higher Education, Manipal, India  
  Email ID: tusar.mishra@manipal.edu
  

- **Rutvik Avinash Barbhai**  
  Undergraduate Student  
  Computer Science and Engineering Department  
  Manipal Institute of Technology, Bengaluru  
  Manipal Academy of Higher Education, Manipal, India  
  Email ID: rutvik.mitblr2022@learner.manipal.edu  
  Contact Number: +91 7887367708  

- **Sheetal Sinha**  
  Undergraduate Student  
  Computer Science and Engineering Department  
  Manipal Institute of Technology, Bengaluru  
  Manipal Academy of Higher Education, Manipal, India   
  Email ID: sheetal.mitblr2022@learner.manipal.edu  
  Contact Number: +91 9962008641  

- **Ankit Sarkar**  
  Undergraduate Student  
  Computer Science and Engineering Department  
  Manipal Institute of Technology, Bengaluru  
  Manipal Academy of Higher Education, Manipal, India  
  Email ID: ankit3.mitblr2022@learner.manipal.edu  
  Contact Number: +91 8700879300


## <img src="https://github.com/user-attachments/assets/9f0497b8-78b3-4d64-8e7f-ace469c4fe70" alt="features icon" width="35" style="vertical-align:middle;"/> Future Work
- Extend to multi-pollution datasets (air, water, noise, soil)
- Deploy as a cloud-based monitoring tool
- Integrate with IoT sensors for live environmental data streaming








