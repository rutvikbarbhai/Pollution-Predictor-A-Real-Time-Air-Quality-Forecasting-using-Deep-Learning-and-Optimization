document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("myChart").getContext("2d");
    let myChart;
    let fullData = []; 

    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:5000/data`);
            const data = await response.json();
            console.log("Fetched Data:", data.length, "records");
            fullData = data; 
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    function downsample(data, numPoints = 2000) {
        if (data.length <= numPoints) return data;
        
        const step = Math.floor(data.length / numPoints);
        return data.filter((_, index) => index % step === 0);
    }

    function renderChart(data, parameter) {
        if (!data || data.length === 0) {
            console.error("No data available for chart rendering.");
            return;
        }

        const timestamps = data.map(row => row.timestamp);
        let datasets = [];

        if (parameter === "all") {
            datasets = [
                { label: "AQI", data: data.map(row => row.AQI), borderColor: "red" },
                { label: "PM2.5", data: data.map(row => row.pm25_value), borderColor: "blue" },
                { label: "PM10", data: data.map(row => row.pm10_value), borderColor: "green" },
                { label: "Temperature", data: data.map(row => row.Temperature), borderColor: "orange" },
                { label: "Humidity", data: data.map(row => row.humidity), borderColor: "purple" },
                { label: "Congestion Index", data: data.map(row => row.congestion_index), borderColor: "brown" }
            ];
        } else {
            datasets.push({
                label: parameter,
                data: data.map(row => row[parameter]),
                borderColor: "black",
                borderWidth: 2
            });
        }

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: timestamps,
                datasets: datasets.map(ds => ({
                    ...ds,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 1,
                    tension: 0.3
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,  
                elements: {
                    point: { radius: 0 }
                },
                plugins: {
                    zoom: {
                        pan: { enabled: true, mode: "x" },
                        zoom: { enabled: true, mode: "x" }
                    }
                },
                scales: {
                    x: { display: true },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    document.getElementById("parameterDropdown").addEventListener("change", async (event) => {
        const parameter = event.target.value;
        const sampledData = downsample(fullData, 2000); 
        renderChart(sampledData, parameter);
    });

    async function init() {
        const data = await fetchData();
        const sampledData = downsample(data, 2000); 
        renderChart(sampledData, "all");
    }

    init();
});
