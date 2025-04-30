<template>
  <div class="common-layout">
    <div class="over">
      <div class="container">
        <div class="icon" :style="{ background: icon.gradientStyle }"><el-icon><img :src="icon.src" alt=""></el-icon>
        </div>
        <div class="content">
          <div style="text-align: end;">{{ name }}</div>
          <div class="total" style="text-align: end; font-weight: 700; font-size: 16px;">{{ total }}</div>
        </div>
      </div>
      <hr style="margin: 1vh 0vw 1vh 0vw;">
      <div style="margin-left: 1vh;"><span style=" font-weight: 300">{{ increase }}</span></div>
      <!-- <div style="margin-left: 1vh;"><span style="color: #4CAF50; font-weight: 600">{{ increase }}</span> than last week</div> -->
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
import circle from '@/assets/dashboard/account-circle.png';
import plus from '@/assets/dashboard/account-plus.png';
import bar from '@/assets/dashboard/chartBar.png';
import store from '@/assets/dashboard/store.png';

export default {
  props: {
    name: {
      type: String
    },
    total: {
      type: String
    },
    increase: {
      type: String
    },
    iconType: {
      type: String
    },
    gradientStyle: {
      type: String
    },
  },
  computed: {
    icon() {
      // Determine icon based on iconType
      switch (this.iconType) {
        case 'circle':
          return {
            src: circle,
            gradientStyle: 'linear-gradient(180deg, #3E3D45 0%, #202020 100%)',
          };
        case 'plus':
          return {
            src: plus,
            gradientStyle: 'linear-gradient(180deg, #439DEE 0%, #1E78E9 100%)',
          };
        case 'store':
          return {
            src: store,
            gradientStyle: 'linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)',
          };
        case 'bar':
          return {
            src: bar,
            gradientStyle: 'linear-gradient(180deg, #63B967 0%, #4BA64F 100%)',
          };
      }
    }
  }
}
</script>


<style scoped>
.common-layout {
  font-family: 'Roboto', sans-serif;
  font-size: 17px;

}

.over {
  width: 17vw;
  height: 16vh;
  margin: 0px 0px 0px 52px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  font-size: 12px;
}

.container {
  display: flex;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.5vh;
  margin-right: 0.1vw;
}

.icon {
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  position: relative;
  top: -15px;
  left: 16px;
  margin-right: 4vw;
}

@media (max-width: 1067px) {
  .over {
    margin: 0px 0px 0px 12px;
  }

  .content {
    font-size: 11px;
  }

  .total {
    font-weight: normal;
    font-size: 10px;
    /* color: red; */
  }
}

@media (min-width: 481px) and (max-width: 767px) {

  .over {
    margin-top: 3vh;
    width: 35vw;
  }
}

@media (max-width: 480px) {
  .over {
    margin-top: 3vh;
    width: 55vw;
  }
}
</style>
