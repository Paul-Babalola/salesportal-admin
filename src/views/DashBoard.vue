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
                        <ChartTwoVue class="graph1" />
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
                        <RowThreeVue />
                    </div>
                    <p>© 2024, Paul Babalola Dev work.</p>

                </el-plan>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElIcon, ElHeader, ElInput, ElRow, ElCol } from 'element-plus';
import { ref, onMounted } from 'vue';
import SideBarVue from '@/components/SideBar.vue';
import ChartOneVue from '@/components/dashboard/ChartOne.vue';
import ChartTwoVue from '@/components/dashboard/ChartTwo.vue';
import RowThreeVue from '@/components/dashboard/RowThree.vue';
import RowOneVue from '@/components/dashboard/RowOne.vue';
import apiClient from '@/axios.js';

const sinput = ref('')

const increase_sme = ref('No data');
const total_sme = ref('0');

const increase_residential = ref('No data');
const total_residential = ref('0');

const increase_revenue = ref('No data');
const total_revenue = ref('0');

const increase_week = ref('No data');
const total_week = ref('0');

const dailySalesData = ref([]);
const dailySalesLabels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
const dailySalesTrend = ref('');
const monthlySalesData = ref([]);
const monthlySalesLabels = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
const monthlySalesTrend = ref('');

const fetchSmeSignUpStats = async () => {
    try {
        let cachedData = localStorage.getItem('smeSignup');
        if (cachedData) {
            const data = JSON.parse(cachedData);
            displaySmeStats(data);
        }

        const response = await apiClient.get('/AdminDashBoardStats/admin/weekly-sme-signups');
        const newData = {
            increase: response.data.trend !== null ? response.data.trend : 'No data',
            total: response.data.signUpsForTheWeek !== "0" ? response.data.signUpsForTheWeek : '0'
        };

        displaySmeStats(newData);

        localStorage.setItem('smeSignup', JSON.stringify(newData));
    } catch (error) {
        console.error('Error fetching SME sign-up stats:', error);
        displaySmeStats({ increase: 'No data', total: '0' });
    }
};

const displaySmeStats = (data) => {
    increase_sme.value = data.increase;
    total_sme.value = data.total;
};

const fetchResidentialSignUpStats = async () => {
    try {
        let cachedData = localStorage.getItem('residentialSignup');
        if (cachedData) {
            const data = JSON.parse(cachedData);
            displayResidentialStats(data);
        }

        const response = await apiClient.get('/AdminDashBoardStats/admin/weekly-residential-signups');
        const newData = {
            increase: response.data.trend !== null ? response.data.trend : 'No data',
            total: response.data.signUpsForTheWeek !== "0" ? response.data.signUpsForTheWeek : '0'
        };

        displayResidentialStats(newData);

        localStorage.setItem('residentialSignup', JSON.stringify(newData));
    } catch (error) {
        console.error('Error fetching residential sign-up stats:', error);
        displayResidentialStats({ increase: 'No data', total: '0' });
    }
};

const displayResidentialStats = (data) => {
    increase_residential.value = data.increase;
    total_residential.value = data.total;
};

const fetchRevenueStats = async () => {
    try {
        let cachedData = localStorage.getItem('revenue');
        if (cachedData) {
            const data = JSON.parse(cachedData);
            displayRevenueStats(data);
        }

        const response = await apiClient.get('/AdminDashBoardStats/admin/monthly-revenue');
        const newData = {
            increase: response.data.trend !== null ? response.data.trend : 'No data',
            total: response.data.revenueForTheMonth !== "0" ? response.data.revenueForTheMonth : '0'
        };

        displayRevenueStats(newData);

        localStorage.setItem('revenue', JSON.stringify(newData));
    } catch (error) {
        console.error('Error fetching revenue stats:', error);
        displayRevenueStats({ increase: 'No data', total: '0' });
    }
};

const displayRevenueStats = (data) => {
    increase_revenue.value = data.increase;
    total_revenue.value = data.total;
};

const fetchWeeklyStats = async () => {
    try {
        let cachedData = localStorage.getItem('weeklyStats');
        if (cachedData) {
            const data = JSON.parse(cachedData);
            displayWeeklyStats(data);
        }

        const response = await apiClient.get('/AdminDashBoardStats/admin/weekly-total-signups');
        const newData = {
            increase: response.data.trend !== null ? response.data.trend : 'No data',
            total: response.data.signUpsForTheWeek !== "0" ? response.data.signUpsForTheWeek : '0'
        };

        displayWeeklyStats(newData);

        localStorage.setItem('weeklyStats', JSON.stringify(newData));
    } catch (error) {
        console.error('Error fetching weekly stats:', error);
        displayWeeklyStats({ increase: 'No data', total: '0' });
    }
};

const displayWeeklyStats = (data) => {
    increase_week.value = data.increase;
    total_week.value = data.total;
};

const fetchDailySalesData = async () => {
    try {
        const response = await apiClient.get('/AdminDashBoardStats/admin/daily-sales-for-the-week');
        const data = response.data.data;
        dailySalesData.value = Object.values(data);
        dailySalesTrend.value = response.data.trend;
    } catch (error) {
        console.error('Error fetching daily sales data:', error);
    }
};

const fetchMonthlySalesData = async () => {
    try {
        const response = await apiClient.get('/AdminDashBoardStats/admin/monthly-sales-for-the-year');
        const data = response.data.data;

        const salesData = Array(12).fill(0);

        Object.entries(data).forEach(([month, value]) => {
            const monthIndex = monthlySalesLabels.value.findIndex(label => label.startsWith(month.slice(0, 3)));
            if (monthIndex !== -1) {
                salesData[monthIndex] = value;
            }
        });

        monthlySalesData.value = salesData;
        monthlySalesTrend.value = response.data.trend;
    } catch (error) {
        console.error('Error fetching monthly sales data:', error);
    }
};

onMounted(() => {
    fetchSmeSignUpStats();
    fetchResidentialSignUpStats();
    fetchRevenueStats();
    fetchWeeklyStats();
    fetchDailySalesData();
    fetchMonthlySalesData();
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
