  const colors = {
      primary: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#1e3a8a'],
      monthly: {
        'January': '#0c4a6e',
        'February': '#075985',
        'March': '#0369a1',
        'April': '#0284c7',
        'May': '#0ea5e9',
        'June': '#38bdf8',
        'July': '#1e40af',
        'August': '#3b82f6',
        'September': '#60a5fa',
        'October': '#1e3a8a',
        'November': '#1e293b',
        'December': '#334155'
      },
      gradient: ['#0f172a', '#1e3a8a', '#1e40af', '#3b82f6', '#60a5fa']
    };
    // Data - Most Precipitous Month by District
    const seasonalData = {
      districts: ['Colombo', 'Gampaha', 'Kalutara', 'Galle', 'Matara', 'Hambantota', 'Ratnapura', 'Kegalle', 'Badulla', 'Moneragala', 'Kandy', 'Matale', 'Nuwara Eliya', 'Welimada', 'Bandarawela', 'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee'],
      months: ['May', 'June', 'May', 'May', 'May', 'November', 'June', 'June', 'December', 'November', 'October', 'October', 'June', 'December', 'November', 'June', 'October', 'November', 'December', 'November', 'November', 'November', 'November', 'November', 'December', 'December', 'December'],
      precipitation: [7202, 7410, 7274, 7071, 6345, 4047, 7899, 6104, 4781, 4244, 4446, 4544, 5212, 4583, 4544, 5036, 4920, 3995, 4401, 5121, 5137, 4452, 4076, 5537, 5741, 5144, 5504]
    };

    const topDistricts = {
      names: ['Ratnapura', 'Kalutara', 'Colombo', 'Galle', 'Gampaha'],
      totals: [78990, 72740, 72020, 70710, 74100]
    };

    const temperatureData = {
      years: ['2020', '2021', '2022', '2023', '2024'],
      percentages: [42, 38, 45, 41, 47]
    };

    const extremeWeatherData = {
      districts: ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Batticaloa', 'Ampara'],
      days: [89, 76, 95, 68, 52, 142, 78, 81, 34, 28, 45, 59]
    };

    // Chart 1: Seasonal Precipitation (Grouped Bar Chart)
    const ctx1 = document.getElementById('seasonalChart').getContext('2d');
    const seasonalChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: seasonalData.districts,
        datasets: [{
          label: 'Precipitation (hrs)',
          data: seasonalData.precipitation,
          backgroundColor: seasonalData.months.map(m => colors.monthly[m]),
          borderRadius: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => items[0].label,
              label: (context) => {
                const month = seasonalData.months[context.dataIndex];
                return `${month}: ${context.parsed.y} hrs`;
              }
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Precipitation (hrs)', font: { size: 14, weight: 'bold' } },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          }
        }
      }
    });

    // Create custom legend for monthly chart
    const legendContainer = document.getElementById('seasonalLegend');
    const uniqueMonths = [...new Set(seasonalData.months)];
    uniqueMonths.sort((a, b) => {
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
    uniqueMonths.forEach(month => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
                <div class="legend-color" style="background: ${colors.monthly[month]}"></div>
                <span>${month}</span>
            `;
      legendContainer.appendChild(item);
    });

    // Chart 2: Top Districts (Horizontal Bar Chart)
    const ctx2 = document.getElementById('topDistrictsChart').getContext('2d');
    const topDistrictsChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: topDistricts.names,
        datasets: [{
          label: 'Total Precipitation (mm)',
          data: topDistricts.totals,
          backgroundColor: colors.gradient,
          borderRadius: 8,
          borderWidth: 0
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.parsed.x} mm`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: 'Total Precipitation (mm)', font: { size: 14, weight: 'bold' } },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });

    // Chart 3: Temperature (Doughnut Chart)
    const ctx3 = document.getElementById('temperatureChart').getContext('2d');
    const temperatureChart = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: temperatureData.years,
        datasets: [{
          data: temperatureData.percentages,
          backgroundColor: ['#667eea', '#5a6bdc', '#0074e8', '#4aa0ff', '#009edc'],
          borderWidth: 0,
          hoverOffset: 20
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: { size: 13 },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed}% of months`
            }
          }
        }
      }
    });

    // Chart 4: Extreme Weather (Radar Chart)
    const ctx4 = document.getElementById('extremeWeatherChart').getContext('2d');
    const extremeWeatherChart = new Chart(ctx4, {
      type: 'radar',
      data: {
        labels: extremeWeatherData.districts,
        datasets: [{
          label: 'Extreme Weather Days',
          data: extremeWeatherData.days,
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          borderColor: '#667eea',
          borderWidth: 3,
          pointBackgroundColor: '#667eea',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#667eea',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { size: 14, weight: 'bold' },
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.parsed.r} days`
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              stepSize: 30,
              font: { size: 11 }
            },
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            pointLabels: {
              font: { size: 12, weight: 'bold' }
            }
          }
        }
      }
    });