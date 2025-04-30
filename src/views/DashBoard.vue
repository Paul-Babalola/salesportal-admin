<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside" width="15vw" style="height: 100vh;">
                <SideBarVue />
            </el-aside>

            <el-container>
                <el-header>
                    <div class="box">
                        <h4>Dash Board</h4>
                        <div class="inputcon">
                            <!-- <el-input class="inputs" v-model="sinput" type="text" name="search" placeholder="Search.."
                                prefix-icon="Search"></el-input> -->
                        </div>

                    </div>
                    <div style="padding: 18px 0px; width: 85vw;">
                        <span style="padding:0px 15px;">All</span><el-icon
                            style="margin: 0px 5px; position: relative; top: 2px;">
                            <CaretBottom />
                        </el-icon>
                        <div style="float: right; position: relative;">
                            <!-- <el-icon style="margin: 0px 5px;"><Search/></el-icon>
                <el-icon style="margin: 0px 5px;"><Setting/></el-icon> -->
                            <!-- <el-icon style="margin: 0px 45px;">
                                <MoreFilled />
                            </el-icon> -->
                        </div>
                        <hr style="margin: 10px 0px 0px 0px; height: 1px; background-color: #ccc; border: none;">
                    </div>
                </el-header>

                <el-plan style="height: 85vh; width: 85vw; padding: 3vh 0vw; overflow-y: hidden;">
                    <!-- <el-main style="width: 85vw; padding: 3vh 0vw;"> -->
                    <div class="rowone">
                        <RowOneVue class="circle-styles" iconType="circle" name="SME Sign Up" :increase="increase_sme"
                            :total="total_sme" />
                        <RowOneVue class="plus-styles" iconType="plus" name="Residential Sign Up"
                            :increase="increase_residential" :total="total_residential" />
                        <RowOneVue class="store-styles" iconType="store" name="Revenue" :increase="increase_revenue"
                            :total="total_revenue" />
                        <RowOneVue class="bar-styles" iconType="bar" name="This Week's Sign Up"
                            :increase="increase_week" :total="total_week" />
                    </div>
                    <div class="rowtwo">
                        <ChartTwoVue
  :chartData="[300, 500, 450, 600, 550, 700, 800]"
  :chartLabels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
  chartTitle="Website Views"
  chartSubtitle="This Week"
  gradientColor="linear-gradient(180deg, #5A9EF8 0%, #397AF6 100%)"
  boxShadowStyle="0px 2px 6px rgba(89, 154, 249, 0.36)"
/>
                        <ChartOneVue class="graph2" chartId="chart1" :chartData="dailySalesData"
                            :chartLabels="dailySalesLabels" chartTitle="Daily Sales"
                            gradientColor="linear-gradient(180deg, #63B967 0%, #4BA64F 100%)"
                            :chartIncrease="dailySalesTrend" boxShadowStyle="0px 2px 6px rgba(79, 169, 83, 0.36)" />
                        <ChartOneVue class="graph3" chartId="chart2" :chartData="monthlySalesData"
                            :chartLabels="monthlySalesLabels" chartTitle="Monthly Sales"
                            gradientColor="linear-gradient(180deg, #3E3D45 0%, #202020 100%)" 
                            :chartIncrease="monthlySalesTrend" boxShadowStyle="0px 2px 6px rgba(0, 0, 0, 0.25)" />
                    </div>
                    <div class="rowthree">
                        <RowThreeVue
  :title="'Top Sales'"
  :salesData="[
    { name: 'Paul Babalola', total: 120000, quantity: 12 },
    { name: 'John Doe', total: 95000, quantity: 9 },
    { name: 'Nazario Ronaldo', total: 87000, quantity: 8 }
  ]"
/>
                    </div>
                    <p>© 2024, Paul Babalola Dev work.</p>

                </el-plan>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import SideBarVue from '@/components/SideBar.vue';
import ChartOneVue from '@/components/dashboard/ChartOne.vue';
import ChartTwoVue from '@/components/dashboard/ChartTwo.vue';
import RowThreeVue from '@/components/dashboard/RowThree.vue';
import RowOneVue from '@/components/dashboard/RowOne.vue';

const sinput = ref('');

// Dummy values for cards
const increase_sme = ref('12% increase');
const total_sme = ref('320');

const increase_residential = ref('8% increase');
const total_residential = ref('180');

const increase_revenue = ref('15% increase');
const total_revenue = ref('₦4,500,000');

const increase_week = ref('10% increase');
const total_week = ref('500');

// Dummy chart data
const dailySalesData = ref([150, 200, 180, 220, 300, 250, 270]);
const dailySalesLabels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
const dailySalesTrend = ref(' 12% increase');

// Monthly sales dummy data
const monthlySalesData = ref([1200, 1350, 1100, 1500, 1400, 1550, 1600, 1700, 1800, 2000, 2100, 2200]);
const monthlySalesLabels = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
const monthlySalesTrend = ref(' 25% increase' );

const websiteViewsData = ref([500, 620, 580, 690, 720, 650, 700]);
const websiteViewsLabels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
const websiteViewsTrend = ref('+5.3%');

const topSalesData = ref([
  { name: 'Fiber Plan 100Mbps', unitsSold: 120, revenue: '₦360,000' },
  { name: 'SME Broadband 50Mbps', unitsSold: 95, revenue: '₦285,000' },
  { name: 'TV Bundle', unitsSold: 78, revenue: '₦234,000' },
]);


// No API fetching needed
onMounted(() => {
  console.log('Dashboard mounted with dummy data');
});
</script>

<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
    color: black;
}

.el-header {
    width: 100vw;
    height: 15vh;
    padding: 0px;
    background-color: white;
    margin-right: 0px;
}

p {
    font-size: 12px;
    line-height: 140%;
    margin-top: 13px;
    margin-left: 60px;
}

.box {
    height: 6vh;
    width: 85vw;
    background-color: white;
    display: flex;
    align-items: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.box h4 {
    flex: 1;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.inputcon {
    flex: 1;
    margin: 0vh 0vw 0vh 25vw;
}

.inputs {
    height: 20px;
    width: 250px;
    border-radius: 20px;
    top: -2px;
}

.img {
    flex: 1;
    margin: 0vh 0vw 0vh 50vw;
    flex-shrink: 0;
}

.rowone {
    display: flex;
}

.rowthree {
    width: 63vw;
    height: 25vh;
    margin: 20px 0px 40px 110px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    font-family: 'Roboto';
}

.rowtwo {
    display: flex;
}

@media (min-width: 481px) and (max-width: 767px) {
    .inputcon {
        flex: 1;
        margin: 0vh 0vw 0vh 2vw;
    }

    .img {
        flex: 1;
        margin: 0vh 0vw 0vh 5vw;
    }

    .graph1 {
        margin-right: -6vh;
    }

    .graph2 {
        margin-right: -6vh;
    }

    .el-main {
        margin: 0vh -8vw;
    }

    .rowone {
        display: inline-block;
        width: 120%;
    }

    .icon {
        padding: 40px
    }

    .circle-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .plus-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .store-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .bar-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .rowtwo {
        display: inline-flex;
        list-style-type: none;
        margin-left: -20px;
        margin-bottom: 40px;
    }

    .rowthree {
        margin: 1vh 4vw;
        margin-left: 40px;
        width: 59%;
    }
}

@media (max-width: 480px) {
    .inputcon {
        flex: 1;
        margin: 0vh 0vw 0vh 2vw;
    }

    .img {
        flex: 1;
        margin: 0vh 0vw 0vh 2vw;
    }

    .inputs {
        width: 150px;
    }

    .graph1 {
        margin-right: -6vh;
    }

    .graph2 {
        margin-right: -6vh;
    }

    .el-main {
        margin: 0vh -8vw;
    }

    .rowone {
        display: list-item;
        list-style-type: none;
    }

    .rowone {
        display: inline-block;
    }

    .icon {
        padding: 40px
    }

    .circle-styles {
        width: 225px;
        margin-bottom: 40px;
        margin-left: 0px;
    }

    .plus-styles {
        width: 225px;
        margin-bottom: 40px;
        margin-left: 0px;

    }

    .store-styles {
        width: 225px;
        margin-bottom: 40px;
        margin-left: 0px;

    }

    .bar-styles {
        width: 225px;
        margin-bottom: 40px;
        margin-left: 0px;

    }

    .rowtwo {
        list-style-type: none;
        margin-left: -40px;
        margin-bottom: 40px;
    }

    .rowthree {
        margin: 1vh 4vw;
        margin-left: 10px;
        width: 89%;
    }
}

@media (max-width: 1067px) {
    .inputcon {
        flex: 1;
        margin: 0vh 0vw 0vh 2vw;
    }

    .img {
        flex: 1;
        margin: 0vh 0vw 0vh 7vw;
    }

    .inputs {
        width: 250px;
    }

    .el-main {
        margin: 0vh 0vw;
        /* width:auto; */
    }

    .rowone {
        margin: 0vh 5vw;

    }

}


@media (min-width: 768px) and (max-width: 992px) {
    .rowone {
        display: inline-block;
    }

    .icon {
        padding: 40px
    }

    .circle-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .plus-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .store-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .bar-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .rowtwo {
        display: inline-flex;
        list-style-type: none;
        margin-left: -20px;
        margin-bottom: 40px;
    }

    .rowthree {
        margin: 1vh 4vw;
        margin-left: 30px;
        width: 89%;
    }
}

@media (min-width: 993px) and (max-width: 1260px) {
    /* .rowone {
        display: inline-block;
    }

    .icon {
        padding: 40px
    }

    .circle-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .plus-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .store-styles {
        width: 225px;
        margin-bottom: 40px;
    }

    .bar-styles {
        width: 225px;
        margin-bottom: 40px;
    } */

    .rowtwo {
        display: inline-flex;
        list-style-type: none;
        margin-left: -20px;
        margin-bottom: 40px;
    }

    .rowthree {
        margin: 1vh 4vw;
        margin-left: 30px;
        width: 89%;
        height: 15vh;
    }
}
</style>
