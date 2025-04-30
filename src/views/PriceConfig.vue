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
                        <div class="topping">
                            <h4>Price Configuration</h4>
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
                                <!-- <router-link to="/planedit" class="planbox"> GLOBAL </router-link> -->
                            </div>
                        </el-card>

                        <el-card class="view">
                            <el-row class="container">
                                <div v-if="dataExists" class="old-data">
                                    <h3>CURRENT</h3>
                                    <!-- Display existing plans -->
                                    <div v-for="packageItem in filteredPackages" :key="packageItem.planTypeName">
                                        <label>Package Type:</label>
                                        <span>{{ packageItem.planTypeName }}</span>

                                        <label>Price: </label>
                                        <span>{{ formatNumberWithCommas(packageItem.price) }}</span>

                                        <label>Speed Value: </label>
                                        <span>{{ packageItem.bandSpeedValue }}</span>

                                        <label>Speed Unit: </label>
                                        <span> {{ packageItem.bandSpeedUnit }}</span>

                                        <label>Payment Cycle: </label>
                                        <span>{{ packageItem.paymentCycle }}</span>

                                        <label>Data Allowance: </label>
                                        <span>{{ packageItem.dataAllowance }}</span>

                                        <label>Key Feature 1: </label>
                                        <span>{{ packageItem.keyFeature1 }}</span>

                                        <label>Key Feature 2: </label>
                                        <span>{{ packageItem.keyFeature2 }}</span>

                                        <label>Key Feature 3: </label>
                                        <span>{{ packageItem.keyFeature3 }}</span>

                                        <label>Setup Charge: </label>
                                        <span>{{ formatNumberWithCommas(packageItem.setUpCharge) }}</span>
                                    </div>
                                </div>

                                <div class="new-data">
                                    <h2>UPDATE</h2>
                                    <form @submit.prevent="confirmUpdate">
                                        <label for="plantype">Package Type:</label>
                                        <div class="custom-dropdown">
                                            <select id="type" v-model="selectedPackageName" @change="updateFormFields" required>
                                                <option class="opp" v-for="packageItem in packages" :key="packageItem.planTypeName" :value="packageItem.planTypeName">
                                                    {{ packageItem.planTypeName }}
                                                </option>
                                            </select>
                                        </div>
                                        <label for="price">Price:</label>
                                        <input type="text" id="price" v-model="newPlan.price" required />

                                        <label for="speed">Speed Value:</label>
                                        <input type="text" id="speed" v-model="newPlan.bandSpeedValue" required />

                                        <label for="speed">Speed Unit:</label>
                                        <input type="text" id="speed" v-model="newPlan.bandSpeedUnit" required />

                                        <label for="dataallowance">Payment Cycle:</label>
                                        <input type="text" id="paymentCycle" v-model="newPlan.paymentCycle" required />

                                        <label for="dataallowance">Data Allowance:</label>
                                        <input type="text" id="dataallowance" v-model="newPlan.dataAllowance" required />

                                        <label for="keyFeature1">Key Feature 1:</label>
                                        <input type="text" id="keyFeature1" v-model="newPlan.keyFeature1" required>

                                        <label for="keyFeature2">Key Feature 2:</label>
                                        <input type="text" id="keyFeature2" v-model="newPlan.keyFeature2">

                                        <label for="keyFeature3">Key Feature 3:</label>
                                        <input type="text" id="keyFeature3" v-model="newPlan.keyFeature3">

                                        <label for="setupcharge">Setup Charge:</label>
                                        <input type="text" id="setupcharge" v-model="newPlan.setUpCharge" required />

                                        <button type="submit">Confirm</button>
                                    </form>
                                </div>
                            </el-row>
                        </el-card>
                    </div>
                </el-plan>
                <p><img src="/copyright.png" /> 2024, Paul Babalola Dev work.</p>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ElContainer, ElAside, ElHeader, ElInput, ElMain, ElCard, ElRow, ElMessage, ElLoading, ElMessageBox } from 'element-plus';
import SideBarVue from '@/components/SideBar.vue';

export default {
    components: {
        ElContainer,
        ElAside,
        ElHeader,
        ElInput,
        ElMain,
        ElCard,
        ElRow,
        SideBarVue
    },
    data() {
        return {
            // Dummy data for plans
            plans: [
                { id: 1, planName: "RESIDENTIAL BROADBAND" },
                // { id: 2, planName: "XTREME SERIES" },
                // { id: 3, planName: "SME BROADBAND" },
                // { id: 4, planName: "PROMO CONFIG" }
            ],
            planPaths: {
                "RESIDENTIAL BROADBAND": "/priceconfig",
                "XTREME SERIES": "/xtremeplan",
                "SME BROADBAND": "/smeplan",
                "PROMO CONFIG": "/promoconfig"
            },
            // Dummy data for packages
            packages: [
                {
                    planTypeName: "RESIDENTIAL BROADBAND",
                    price: 1000,
                    bandSpeedValue: 100,
                    bandSpeedUnit: "Mbps",
                    paymentCycle: "Monthly",
                    dataAllowance: "Unlimited",
                    keyFeature1: "Feature 1",
                    keyFeature2: "Feature 2",
                    keyFeature3: "Feature 3",
                    setUpCharge: 500
                },
                {
                    planTypeName: "XTREME SERIES",
                    price: 2000,
                    bandSpeedValue: 200,
                    bandSpeedUnit: "Mbps",
                    paymentCycle: "Quarterly",
                    dataAllowance: "Unlimited",
                    keyFeature1: "Feature 1",
                    keyFeature2: "Feature 2",
                    keyFeature3: "Feature 3",
                    setUpCharge: 1000
                }
            ],
            sinput: '',
            selectedPackageName: "RESIDENTIAL BROADBAND",
            selectedPackageId: 1,
            newPlan: {
                name: '',
                price: 0,
                bandSpeedValue: 0,
                bandSpeedUnit: '',
                paymentCycle: '',
                dataAllowance: '',
                setUpCharge: 0,
                keyFeature1: '',
                keyFeature2: '',
                keyFeature3: '',
            },
            updateError: '',
            loadingPlans: false,
        };
    },
    computed: {
        filteredPackages() {
            return this.packages.filter(packageItem => packageItem.planTypeName === this.selectedPackageName);
        },
        dataExists() {
            return this.packages && this.packages.length > 0;
        }
    },
    methods: {
        getPlanPath(planName) {
            return this.planPaths[planName] || "/";
        },
        getPlanClass(planName) {
            return planName === "RESIDENTIAL BROADBAND" ? "planbox1" : "planbox";
        },
        formatNumberWithCommas(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        confirmUpdate() {
            const loading = ElLoading.service({
                lock: true,
                text: 'Updating plan...',
                background: 'rgba(0, 0, 0, 0.7)',
            });

            // Simulate an API call to update the plan
            setTimeout(() => {
                console.log('Plan updated successfully');
                this.updateError = ''; // Clear any previous errors
                this.showSuccessPopup();
                loading.close();
            }, 1000);
        },
        updateFormFields() {
            const selectedPackage = this.packages.find(p => p.planTypeName === this.selectedPackageName);
            if (selectedPackage) {
                this.newPlan = { ...selectedPackage };
                this.selectedPackageId = selectedPackage.id; // Assuming 'id' is the planTypeID
            }
        },
        showSuccessPopup() {
            ElMessageBox.alert('Plan updated successfully', 'Success', {
                confirmButtonText: 'OK',
                callback: action => {
                    // Reload the page or perform any other action
                    location.reload();
                }
            });
        }
    },

    mounted() {
        console.log('Plans:', this.plans); // Debugging line
        console.log('Data exists:', this.dataExists); // Debugging line
        console.log('Packages:', this.packages);
    }
}
</script>


<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
}

.el-header h4 {
    align-items: center;
}

.el-header {
    width: 100vw;
    height: 12vh;
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
    margin-left: 15px;
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
    background-color: blue;
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
    background-color: blue;
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
    width: 58vw;
    height: 100vh;
    margin-left: 4vw;
    margin-top: 20px;
}


.old-data,
.new-data {
    padding: 0 30px;
    display: inline-block;
    margin: 0px;
    font-size: 10px;
}

.old-data {
    margin-left: -30px;
}


.plans {
    margin-bottom: 20px;
    width: 75vw;
    margin-left: -70px;
}


label {
    display: flex;
    margin-top: 2px;
    font-size: 13px;
}

h2 {
    font-size: 17px;
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;
    font-weight: bolder;
}

h3 {
    font-size: 17px;
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
    margin-left: -180px;
    background-color: blue;
    color: white;
    border-radius: 0px;
    padding: 16px 90px;
    font-weight: bolder;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 50px;
    font-family: "Roboto", sans-serif;
    border: none;
}

input {
    width: 250px;
    height: 20px;
    border-bottom: 2px solid black;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    text-align: right;
    display: flex;
    font-size: 14px;
}

span {
    height: 20px;
    margin-bottom: 0px;
    margin-top: 0px;
    width: 250px;
    border-bottom: 2px solid black;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    text-align: right;
    display: flex;
    font-size: 14px;
}

.input2 {
    height: 28px;
}

select {
    width: 250px;
    height: 20px;
    border-bottom: 2px solid black;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    text-align: right;
    cursor: pointer;
    display: flex;
    font-size: 14px;
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

    span,
    input,
    select {
        width: 160%;
    }

    span {
        width: 200%;
    }


    select {
        margin-left: 0px;
        width: 160%;
    }

    .plans {
        margin: 20px;
        height: 28vh;
        width: 80vw;
    }

    .planbox,
    .planbox1 {
        display: inline-flex;
        margin-top: 7px;
    }

    .view {
        width: 80vw;
        margin: 20px;
        height: 99vh;
    }

    .old-data,
    .new-data {
        padding: 0px 80px;
        font-size: 10px;
    }

    .old-data {
        margin-left: -80px;

    }

    h3,
    h2 {
        font-size: 12px;
    }

    .span1 {
        height: 28px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: -130px;
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
        height: 40vh;
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
        height: 99vh;
        margin-left: -30px;

    }

    span,
    input,
    select {
        width: 90%;
    }

    span {
        width: 110%;
        text-align: left;
    }


    select {
        margin-left: -70px;
        width: 400%;
    }


    .old-data,
    .new-data {
        font-size: 10px;
        margin: 0;
        padding: 38px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: -110px;
    }

    .span1 {
        height: 27px;
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
        height: 99vh;
        margin-left: -30px;
        display: block;
        overflow-y: scroll;
        margin-top: 0px;
    }

    .old-data,
    .new-data {
        font-size: 9px;
        margin: 0;
        padding: 18px;
        width: 100%;
    }

    label,
    input,
    select {

        width: 90%;
        font-size: 10px;
    }

    span {
        width: 90%;
        font-size: 9px;
    }

    select {
        width: 229px;
        margin-left: -25px;
    }

    .input2 {
        height: 30px;
    }

    h3,
    h2 {
        font-size: 10px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
        margin-bottom: 0px;
    }

    .aside {
        width: 30vw;
    }
}
</style>
