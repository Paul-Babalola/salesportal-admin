<template>
  <div class="container">
      <div class="row2" style="background: linear-gradient(180deg, #E93B77 0%, #DA1F63 100%); box-shadow: 0px 2px 6px rgba(220, 34, 101, 0.36);">
          <canvas id="chartt"></canvas>
      </div>
      <h5 style="padding: 7px 0px 0px 10px; font-weight: 700;">Website views</h5> 
      <h6 style="padding: 0px 0px 0px 10px;">Total</h6>
  </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    setup() {
      const chartInstance = ref(null);
  
      const fetchData = async () => {
        try {
          const response = await axios.get('https://devsalesportal.ipnxnigeria.net/api/v1/AdminDashBoardStats/website-visits-for-the-week');
          const data = response.data;
          const dataArray = [
            data.Sunday,
            data.Monday,
            data.Tuesday,
            data.Wednesday,
            data.Thursday,
            data.Friday,
            data.Saturday,
          ];
          updateChart(dataArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      const updateChart = (dataArray) => {
        if (chartInstance.value) {
          chartInstance.value.data.datasets[0].data = dataArray;
          chartInstance.value.update();
        }
      };
  
      onMounted(() => {
        const ctx = document.getElementById('chartt');
        chartInstance.value = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            datasets: [{
              label: '',
              data: [0, 0, 0, 0, 0, 0, 0], // Initial empty data array
              backgroundColor: 'white',
              borderColor: 'white',
              borderWidth: 1,
              barThickness: 3,
            }],
          },
          options: {
          plugins: {
              legend: { display: false },
              title: { display: false }
          },
          layout: { padding: {left: 10, right: 10, top: 10, bottom: 10} },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: { stepSize: 20, color: 'white' },
                  grid: { color: 'white', lineWidth: 0.2 }
              },
              x: {
                  ticks: { color: 'white'},
                  grid: { color: 'white', lineWidth: 0.2 }
              }
          }
      },
        });
  
        fetchData();
      });
  
      return {};
    },
  };
  
  </script>
  
  <style scoped>
  .container{
      width: 21vw;
      height: 24vh;
      margin: 30px 0px 0px 52px;
      background: #FFFFFF;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
  }
  .row2{
      width: 20vw;
      height: 19vh;
      margin: -23px 0px 0px 5.5px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    .container{
      width: 31vw;
      height: 27vh;
      margin: 35px 0px 0px 42px;
    }
    .row2{
      width: 31vw;
    }
  }
  @media (max-width: 480px) {
      .container{
      width: 51vw;
      height: 27vh;
      margin: 35px 0px 0px 42px;
    }
    .row2{
      width: 51vw;
    }
  }
  </style>
  