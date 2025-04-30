<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside">
                <SideBarVue />
            </el-aside>

            <el-container>
                <!-- Header -->
                <el-header>
                    <div class="box">
                        <div class="topping" style="float: left; padding: 8px 0px; ">
                            <h4>Add New Plan</h4>
                            <!-- <div style="float: right; padding: 30px 10px ;" id="search">
                                <el-input class="inputs" v-model="sinput" type="text" name="search" id=""
                                    placeholder="Search.." prefix-icon="Search"></el-input>
                            </div> -->
                        </div>

                        <div style="padding:50px 15px; width: 85vw;">
                            <div style="float: right; position: relative;">
                                <el-icon style="margin: 7px 5px;">
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </el-header>

                <el-plan>
                    <div>
                        <el-card class="plans" :class="{ 'loading': loadingPlans }" ref="plansCard">
                            <div>
                                <router-link v-for="plan in plans" :key="plan.id" :to="getPlanPath(plan.planName)"
                                    :class="getPlanClass(plan.planName)">
                                    {{ plan.planName }}
                                </router-link>
                            </div>
                        </el-card>

                        <el-card class="view">
                            <el-column class="container">

                                <div class="new-data">
                                    <h2>Add New</h2>
                                    <!-- Your form to add new plans goes here -->
                                    <form @submit.prevent="addNewPlan">
                                        <label for="planTypeName">Package Type/Name:</label>
                                        <input type="text" id="planTypeName" v-model="newPlan.planTypeName" required>

                                        <label for="price">Price:</label>
                                        <input type="number" id="price" v-model="newPlan.price" required>

                                        <label for="paymentCycle">Payment Cycle:</label>
                                        <input type="text" id="paymentCycle" v-model="newPlan.paymentCycle" required>

                                        <label for="bandSpeedValue">Speed Value:</label>
                                        <input type="number" id="bandSpeedValue" v-model="newPlan.bandSpeedValue"
                                            required>

                                        <label for="bandSpeedUnit">Speed Unit:</label>
                                        <input type="text" id="bandSpeedUnit" v-model="newPlan.bandSpeedUnit" required>

                                        <label for="dataAllowance">Data Allowance:</label>
                                        <input type="text" id="dataAllowance" v-model="newPlan.dataAllowance" required>

                                        <label for="keyFeature1">Key Feature 1:</label>
                                        <input type="text" id="keyFeature1" v-model="newPlan.keyFeature1" required>

                                        <label for="keyFeature2">Key Feature 2:</label>
                                        <input type="text" id="keyFeature2" v-model="newPlan.keyFeature2" required>

                                        <label for="keyFeature3">Key Feature 3:</label>
                                        <input type="text" id="keyFeature3" v-model="newPlan.keyFeature3" required>

                                        <label for="setUpCharge">Setup Charge:</label>
                                        <input type="number" id="setUpCharge" v-model="newPlan.setUpCharge" required>

                                        <button type="submit">Add</button>
                                    </form>
                                </div>

                            </el-column>

                        </el-card>
                    </div>
                </el-plan>
                <p><img src="/copyright.png"> 2024, ipNX Nigeria Limited</p>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import { ElContainer, ElAside, ElIcon, ElHeader, ElInput, ElRow, ElCol, ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue';
import SideBarVue from '@/components/SideBar.vue';
import apiClient from '@/axios.js'; // Import the axios instance

const sinput = ref('');

const newPlan = ref({
    planTypeName: '',
    price: 0,
    paymentCycle: '',
    bandSpeedValue: 0,
    bandSpeedUnit: '',
    dataAllowance: '',
    keyFeature1: '',
    keyFeature2: '',
    keyFeature3: '',
    setUpCharge: 0
});

const plans = ref([]);
const loadingPlans = ref(true);

const getPlanPath = (planName: string) => {
    const planPaths = {
        "RESIDENTIAL BROADBAND": "/newplanresidential",
        "XTREME SERIES": "/newplanxtremeplan",
        "SME BROADBAND": "/newplansmeplan",
        "PROMO CONFIG": "/promoconfig"
    };
    return planPaths[planName] || "/";
};

const getPlanClass = (planName: string) => {
    return planName === "SME BROADBAND" ? "planbox1" : "planbox";
};

const fetchPlans = () => {
    apiClient.get('/Plans/view-all-plans')
        .then(response => {
            plans.value = response.data;
        })
        .catch(error => {
            console.error('Error fetching plans:', error);
        })
        .finally(() => {
            loadingPlans.value = false;
        });
};


const addNewPlan = async () => {
    try {
        const response = await apiClient.post(
            '/Plans/admin/add-a-planType/3a9bb043-5050-47bb-9cb8-833f4edeb15f',
            newPlan.value
        );
        console.log('Plan added successfully:', response.data);
        ElMessage.success('Plan added successfully');
        ElMessageBox.alert('Plan added successfully', 'Success', {
            confirmButtonText: 'OK',
            callback: action => {
                location.reload();
            }
        });
        // Reset form fields after successful submission
        Object.keys(newPlan.value).forEach(key => {
            if (Array.isArray(newPlan.value[key])) {
                newPlan.value[key].forEach(item => {
                    item.description = '';
                });
            } else {
                newPlan.value[key] = '';
            }
        });
    } catch (error) {
        console.error('Error adding new plan:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);

            if (error.response.status === 409) {
                ElMessage.error('Plan already exists. Please enter a different plan.');
            } else if (error.response.data.errors) {
                ElMessage.error('Validation errors occurred. Please check your input.');
            } else {
                ElMessage.error('Failed to add plan. Please try again later.');
            }
        } else if (error.request) {
            console.error('Request data:', error.request);
            ElMessage.error('No response from server. Please check your network connection.');
        } else {
            console.error('Error message:', error.message);
            ElMessage.error('An unexpected error occurred. Please try again.');
        }
    }
};

fetchPlans();
</script>


<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
}

.el-header {
    width: 100vw;
    height: 15vh;
    padding: 0px;
    background-color: white;
    margin-right: 0px;
    color: black;
    margin-left: -105px;
}

.loading {
    position: relative;
}

.loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    z-index: 9999;
}

.loading::after {
    content: 'Loading...';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: bold;
    color: #333;
    z-index: 10000;
}

.el-footer p {
    font-size: 14px;
    line-height: 140%;
}

.box {
    height: 6vh;
    width: 85vw;
    background-color: white;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.box h4 {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
    color: black;
    margin-left: 20px;
}

.inputs {
    height: 20px;
    width: 250px;
    border-radius: 20px;
    position: relative;
    top: -57px;
}

#search {
    padding: 0px 0px 0px 0px;
    margin-inline: 25vw;
}

.rowone {
    display: flex;
}

.rowtwo {
    display: flex;
}

.rowthree {
    width: 63vw;
    height: 27vh;
    margin: 20px 0px 0px 110px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
}

.topping {
    padding: 0px;
    display: inline;
}

.custom-icon {
    background-image: url('../assets/account-circle.png');
    background-size: cover;
    width: 24px;
    height: 24px;
}

.el-icon {
    color: black;
    width: 15px;
    height: 15px;
}

.planbox {
    color: black;
    border: solid 1px black;
    border-radius: 25px;
    padding: 13px 28px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 600;
    margin-right: 15px;
}

.planbox1 {
    background-color: #DA1919;
    color: white;
    border: none;
    font-weight: 300;
    margin-right: 15px;
    border-radius: 25px;
    padding: 13px 28px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 10px;
}

.planbox:hover {
    background-color: #DA1919;
    color: white;
    border: none;
    font-weight: 300;
}

.el-card {
    border-radius: 30px;
    width: 85vw;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
}

.view {
    width: 56vw;
    height: 93vh;
    margin-left: 4vw;
    margin-top: 20px;
}


.old-data,
.new-data {
    padding: 0 60px;
    display: inline-block;
    margin: 0px;
    font-size: 12px;
}

.plans {
    margin-bottom: 20px;
    width: 75vw;
    margin-left: -70px;
    margin-top: -40px;
}


label {
    display: flex;
    margin-top: 1px;
}

h2 {
    font-size: 15px;
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;
    font-weight: bolder;
}

h3 {
    font-size: 13px;
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;
    font-weight: bolder;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 140px;
    background-color: #DA1919;
    color: white;
    border-radius: 0px;
    padding: 15px 80px;
    font-weight: bolder;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 50px;
    font-family: "Roboto", sans-serif;
    border: none;
}

input {
    width: 470px;
    height: 20px;
    border-bottom: 2px solid black;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    text-align: right;
    display: flex;
}

select {
    width: 470px;
    height: 20px;
    border-bottom: 2px solid black;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    text-align: right;
    cursor: pointer;
    display: flex;
}

p {
    color: black;
    font-size: 12px;
    margin-top: 20px;
    margin-left: 20px;
}

img {
    width: 10px;
    height: 10px;
}

.container {
    display: flex;
}

@media (min-width: 768px) and (max-width: 1021px) {

    .el-header {
        margin-left: 0;
    }


    .plans {
        margin: 20px;
        height: 13vh;
        width: 80vw
    }

    .planbox,
    .planbox1 {
        display: inline-flex;
    }

    .view {
        width: 80vw;
        margin: 20px;
        height: 109vh;
    }

    .old-data,
    .new-data {
        font-size: 14px;
        margin: 0;
    }

    h3,
    h2 {
        font-size: 16px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 160px;
    }

    .aside {
        width: 16vw;
    }
}

@media (min-width: 481px) and (max-width: 767px) {

    .el-header {
        margin-left: -50px;
    }


    .plans {
        margin: 10px;
        height: 30vh;
        width: 80vw;
        margin-left: -30px;
    }

    .planbox,
    .planbox1 {
        display: inline-flex;
        margin-top: 7px;
    }

    .view {
        width: 80vw;
        margin: 5px;
        height: 98vh;
        margin-left: -30px;

    }

    .old-data,
    .new-data {
        font-size: 12px;
        margin: 0;
        padding: 8px;
    }

    label,
    input,
    select {

        width: 100%;

    }


    h3,
    h2 {
        font-size: 18px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        padding: 10px 40px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 30px;
    }

    .aside {
        width: 26vw;
    }
}

@media (max-width: 480px) {

    .plans {
        margin: 10px;
        height: 47vh;
        width: 80vw;
        margin-left: -30px;

    }

    .el-header {
        margin-left: -45px;
    }

    .planbox,
    .planbox1 {
        display: flex;
        margin-top: 7px;
    }

    .inputs {
        width: 160px;
        margin-left: -50px;
    }

    .view {
        width: 80vw;
        margin: 8px;
        height: 97vh;
        margin-left: -30px;
    }

    .old-data,
    .new-data {
        font-size: 11px;
        margin: 0;
        padding: 18px;
        width: 90%;
    }

    label,
    input,
    select {

        width: 100%;

    }


    h3,
    h2 {
        font-size: 14px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        padding: 10px 40px;
    }

    .aside {
        width: 30vw;
    }
}
</style>
