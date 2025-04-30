<template>
  <div class="container">
    <div class="row2" :style="{ background: gradientColor, boxShadow: boxShadowStyle }">
      <canvas :id="chartId"></canvas>
    </div>
    <h5 style="padding: 7px 0px 0px 10px; font-weight: 700;">{{ chartTitle }}</h5>
    <h6 style="padding: 0px 0px 0px 10px;">{{ chartIncrease }}</h6>
  </div>
</template>

<script>
import { watch, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    chartData: {
      type: Array,
      default: () => []
    },
    chartLabels: {
      type: Array,
      default: () => []
    },
    gradientColor: {
      type: String,
      default: ''
    },
    boxShadowStyle: {
      type: String,
      default: ''
    },
    chartTitle: {
      type: String,
      default: ''
    },
    chartIncrease: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  methods: {
    createChart() {
      const ctx = document.getElementById(this.chartId).getContext('2d');
      if (this.myChart) this.myChart.destroy();
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Sales',
            data: this.chartData,
            fill: false,
            borderColor: 'white',
            tension: 0.1,
            pointBackgroundColor: 'white'
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              position: 'bottom',
              grid: { color: 'transparent' },
              ticks: { color: 'white', fontSize: 7 }
            },
            y: {
              type: 'linear',
              position: 'left',
              min: 0,
              grid: { color: 'rgba(255, 255, 255, 0.2)', borderDash: [5, 5] },
              ticks: { stepSize: 100000, color: 'white' }
            }
          },
          plugins: {
            legend: { display: false },
            title: { display: false }
          },
          layout: { padding: { left: 10, right: 10, top: 10, bottom: 10 } },
          backgroundColor: 'red'
        }
      });
    }
  },
  mounted() {
    this.createChart();
  },
  watch: {
    chartData() {
      this.createChart();
    },
    chartLabels() {
      this.createChart();
    }
  }
};
</script>


<style scoped>
.container {
  width: 21vw;
  height: 24vh;
  margin: 30px 0px 0px 52px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
}

.row2 {
  width: 20vw;
  height: 19vh;
  margin: -23px 0px 0px 5.5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 481px) and (max-width: 767px) {
  .container {
    width: 31vw;
    height: 27vh;
    margin: 35px 0px 0px 42px;
  }

  .row2 {
    width: 31vw;
  }
}

@media (max-width: 480px) {
  .container {
    width: 51vw;
    height: 27vh;
    margin: 35px 0px 0px 42px;
  }

  .row2 {
    width: 51vw;
  }
}
</style>

