<template>
  <div class="container">
    <div
      class="row2"
      :style="{
        background: gradientColor,
        boxShadow: boxShadowStyle,
      }"
    >
      <canvas id="chartt"></canvas>
    </div>
    <h5 style="padding: 7px 0px 0px 10px; font-weight: 700;">{{ chartTitle }}</h5>
    <h6 style="padding: 0px 0px 0px 10px;">{{ chartSubtitle }}</h6>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  props: {
    chartTitle: {
      type: String,
      default: 'Website Views',
    },
    chartSubtitle: {
      type: String,
      default: 'Total',
    },
    chartData: {
      type: Array,
      default: () => [], // Will fallback to API if empty
    },
    chartLabels: {
      type: Array,
      default: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    },
    gradientColor: {
      type: String,
      default: 'linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)',
    },
    boxShadowStyle: {
      type: String,
      default: '0px 2px 6px rgba(220, 34, 101, 0.36)',
    },
  },
  setup(props) {
    const chartInstance = ref(null);

    const initializeChart = (dataArray) => {
      const ctx = document.getElementById('chartt');
      if (chartInstance.value) chartInstance.value.destroy(); // prevent duplicate chart on hot reload
      chartInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: props.chartLabels,
          datasets: [
            {
              label: '',
              data: dataArray,
              backgroundColor: 'white',
              borderColor: 'white',
              borderWidth: 1,
              barThickness: 3,
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
          layout: {
            padding: { left: 10, right: 10, top: 10, bottom: 10 },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 20, color: 'white' },
              grid: { color: 'white', lineWidth: 0.2 },
            },
            x: {
              ticks: { color: 'white' },
              grid: { color: 'white', lineWidth: 0.2 },
            },
          },
        },
      });
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://devsalesportal.ipnxnigeria.net/api/v1/AdminDashBoardStats/website-visits-for-the-week'
        );
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
        initializeChart(dataArray);
      } catch (error) {
        console.error('Error fetching website views:', error);
        initializeChart([0, 0, 0, 0, 0, 0, 0]); // fallback
      }
    };

    onMounted(() => {
      if (props.chartData.length) {
        initializeChart(props.chartData);
      } else {
        fetchData();
      }
    });

    watch(() => props.chartData, (newVal) => {
      if (newVal.length && chartInstance.value) {
        chartInstance.value.data.datasets[0].data = newVal;
        chartInstance.value.update();
      }
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
  