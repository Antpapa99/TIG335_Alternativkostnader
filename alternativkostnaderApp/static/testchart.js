document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    function renderChart(data) {
        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                // Add any options you need here
            }
        });
    }

    function fetchChartData() {
        return fetch('/fetch_chart_data/') // URL to fetch chart data from
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching chart data:', error);
            });
    }

    fetchChartData().then(chartData => {
        let myChart = renderChart(chartData);
        let labelAIncrement = 0; 

        // Add event listener to button
        document.querySelector('button').addEventListener('click', function () {
            labelAIncrement += 20;
            fetchChartData().then(updatedChartData => {
                // Update label A value by 20
                updatedChartData.values[0] += labelAIncrement

                // Clear previous chart
                myChart.destroy();

                // Render updated chart
                myChart = renderChart(updatedChartData);
            });
        });
    });
});
