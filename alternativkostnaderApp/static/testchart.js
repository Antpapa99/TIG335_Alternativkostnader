document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart').getContext('2d');

    function fetchChartData() {
        return fetch('/fetch_chart_data/') // URL to fetch chart data from
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error fetching chart data:', error);
            });
    }

    fetchChartData().then(chartData => {
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.values,
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
    });
});