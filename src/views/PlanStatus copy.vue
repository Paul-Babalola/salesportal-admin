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
                            <h4>Plan Status</h4>
                            <!-- <div class="search-box">
                                <el-input class="inputs" v-model="sinput" type="text" placeholder="Search.."
                                    prefix-icon="el-icon-search"></el-input>
                            </div> -->
                        </div>

                    </div>
                </el-header> <!-- Main Content -->
                <el-plan>
                    <el-col class="container">
                        <div class="table-header">
                            <span class="table-header">Plan Name</span>
                            <span class="table-header">Package Name</span>
                            <span class="table-header">Speed</span>
                            <span class="table-header">Payment Cycle</span>
                            <span class="table-header">Key Feature 1</span>
                            <span class="table-header">Key Feature 2</span>
                            <span class="table-header">Key Feature 3</span>
                            <span class="table-header">Action</span>
                        </div>
                        <!-- Table Content -->
                        <div v-for="(plan, index) in plans" :key="index" class="table-row">
                            <span class="table-cell">{{ plan.planName }}</span>
                            <span class="table-cell">{{ plan.planTypeName }}</span>
                            <span class="table-cell">{{ plan.bandSpeedValue }}{{ plan.bandSpeedUnit }}</span>
                            <span class="table-cell">{{ plan.paymentCycle }}</span>
                            <span class="table-cell">{{ plan.keyFeature1 }}</span>
                            <span class="table-cell">{{ plan.keyFeature2 }}</span>
                            <span class="table-cell">{{ plan.keyFeature3 }}</span>
                            <span class="table-cell">
                                <button @click="togglePackageStatus(plan.planTypeId)">
                                    {{ plan.isActive ? 'Deactivate' : 'Activate' }}
                                </button>
                            </span>
                        </div>
                    </el-col>
                </el-plan>

                <!-- Footer -->
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ElContainer, ElAside, ElHeader, ElMain, ElCol, ElCard, ElButton, ElRow, ElLoading, ElMessageBox } from 'element-plus';
import SideBarVue from '@/components/SideBar.vue';
import apiClient from '@/axios.js'; // Import the axios instance

export default {
    components: {
        ElContainer,
        ElAside,
        ElHeader,
        ElMain,
        ElCol,
        ElCard,
        ElButton,
        ElRow,
        SideBarVue,
    },

    data() {
        return {
            plans: [],
            loadingInstance: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.loadingInstance = ElLoading.service({ text: 'Loading...' });
                const response = await apiClient.get('/Plans/admin/view-all-planTypes');
                this.plans = response.data.map((plan) => ({
                    planTypeId: plan.planTypeId,
                    planTypeName: plan.planTypeName,
                    isActive: plan.isActive === 'True',
                    planName: plan.planName,
                    bandSpeedValue: plan.bandSpeedValue,
                    bandSpeedUnit: plan.bandSpeedUnit,
                    paymentCycle: plan.paymentCycle,
                    keyFeature1: plan.keyFeature1,
                    keyFeature2: plan.keyFeature2,
                    keyFeature3: plan.keyFeature3
                }))
                    .sort((a, b) => a.planName.localeCompare(b.planName));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.loadingInstance.close();
            }
        },
        async togglePackageStatus(planTypeId) {
            try {
                const plan = this.plans.find((plan) => plan.planTypeId === planTypeId);
                if (!plan) {
                    console.error('Plan type not found');
                    return;
                }

                // Invert the current isActive status
                plan.isActive = !plan.isActive;

                this.loadingInstance = ElLoading.service({ text: 'Updating status...' });
                const response = await apiClient.patch(
                    `/Plans/admin/deactivate-or-activate-plantype/${planTypeId}?activate=${plan.isActive}`,
                    { isActive: plan.isActive } // Send the inverted isActive status
                );

                if (response.status === 200) {
                    console.log('Package status updated successfully:', response.data);
                    ElMessageBox.alert('Package status updated successfully', 'Success', {
                        confirmButtonText: 'OK',
                        type: 'success',
                    });
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Error updating package status:', error);
            } finally {
                this.loadingInstance.close();
            }
        },
    },
};
</script>



<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
}

.container {
    width: 56vw;
    height: 90vh;
    margin-left: -40px;
    margin-top: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.el-header {
    width: 100vw;
    height: 12vh;
    padding: 0px;
    background-color: white;
    margin-right: 0px;
    color: black;
    margin-left: -395px;
}

.common-layout {
    font-family: 'Roboto', sans-serif;
}


/* Table Styles */
.table-header {
    flex: 1;
    display: flex;
    padding: 10px 1px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #DA1919;
}

.table-row {
    display: flex;
    padding: 10px 0;
}

.table-cell {
    flex: 1;
    padding: 0 1px;
    font-size: 12px;
    text-align: center;
    justify-content: center;
    align-items: center;
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
    margin-left: 300px;
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
    padding-top: 9px;
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
    background-color: red;
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
    background-color: red;
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
    height: 80vh;
    margin-left: 4vw;
    margin-top: 20px;

}

.plans {
    margin-bottom: 20px;
    width: 75vw;
    margin-left: -70px;
}

label {
    display: flex;
    margin-top: 2px;
}

h2 {
    font-size: 13px;
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
    margin-left: 10px;
    background-color: #DA1919;
    color: white;
    border-radius: 10px;
    padding: 5px 30px;
    font-weight: bolder;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    border: none;
    margin-top: -20px;
    margin-bottom: -10px;
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
    height: 40px;
    margin-bottom: 0px;
    margin-top: 0px;
    width: 250px;
    border-bottom: 1px solid black;
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
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 70px;
    color: black;
    height: 75vh;
    overflow-y: auto;
    width: 80vw;
}

.table-cell {
    margin: 5px 0;
}

.toggle-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.toggle-button:hover {
    background-color: #0056b3;
}

@media (min-width: 768px) and (max-width: 1021px) {

    .el-header {
        margin-left: -315px;
    }

    .container {
        margin-left: 5px;
        width: 80vw;
    }

    p {
        margin-left: 150px;
    }

    span,
    input,
    select {
        width: 130%;
    }

    span {
        width: 130%;
    }


    select {
        margin-left: -76px;
        width: 400%;
    }

    .plans {
        margin: 20px;
        height: 28vh;
        width: 80vw
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


    h3,
    h2 {
        font-size: 22px;
    }

    .span1 {
        height: 28px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
    }

    .aside {
        width: 16vw;
    }
}

@media (min-width: 481px) and (max-width: 767px) {

    .el-header {
        margin-left: -310px;
    }

    .container {
        margin-left: 10px;
        width: 80vw;
    }

    .table-header {
        font-size: 14px;
    }

    .table-cell {
        font-size: 9px;

    }

    button {
        font-size: 10px;
    }

    .box {
        margin-left: 300px;
        height: 6vh;
        width: 85vw;
        background-color: white;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    }

    p {
        margin-left: 150px;
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
        margin-left: -80px;
        width: 360%;
    }


    .old-data,
    .new-data {
        font-size: 10px;
        margin: 0;
        padding: 8px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
    }

    .span1 {
        height: 27px;
    }

    .aside {
        width: 16vw;
    }
}

@media (max-width: 480px) {

    .container {
        margin-left: -50px;
    }

    .table-header {
        font-size: 10px;
    }

    .table-cell {
        font-size: 7px;
    }

    button {
        font-size: 7px;
        width: 30px;
    }

    .plans {
        margin: 10px;
        height: 47vh;
        width: 80vw;
        margin-left: -30px;

    }

    .el-header {
        margin-left: -365px;
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
        height: 89vh;
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
        text-align: right;
    }

    span {
        width: 90%;
        font-size: 13px;
        height: 20px;
    }

    select {
        width: 200px;
        margin-left: -15px;
    }

    .input2 {
        height: 30px;
    }

    h3,
    h2 {
        font-size: 20px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
        margin-bottom: -10px;
        margin-left: -10px;
    }

    .aside {
        width: 30vw;
    }
}
</style>
