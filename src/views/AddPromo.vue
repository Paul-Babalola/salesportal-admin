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
                        <div class="topping" style="float: left; padding: 8px 0px;">
                            <h4>Plan Edit</h4>
                        </div>
                        <div style="padding:50px 15px; width: 85vw;">
                            <div style="float: right; position: relative;">
                                <el-icon style="margin: 7px 5px;"></el-icon>
                            </div>
                        </div>
                    </div>
                </el-header>

                <el-plan>
                    <el-card class="plans">
                        <router-link to="/smeplan" class="planbox">SME BROADBAND</router-link>
                        <router-link to="/priceconfig" class="planbox">RESIDENTIAL BROADBAND</router-link>
                        <router-link to="/xtremeplan" class="planbox">XTREME SERIES</router-link>
                        <router-link to="/planedit" class="planbox1">GLOBAL </router-link>
                    </el-card>

                    <el-card class="view">
                        <el-row class="container">
                            <div class="old-data">
                            <h3>Current </h3>
                            <div v-if="currentPlanDetails">
                                <label for="currentType">Package Type:</label>
                                <span>{{ currentPlanDetails?.planName || '' }}</span>

                                <div>
                                    <label>Setup Charge:</label>
                                    <span>{{ currentPlanDetails?.setUpCharge || '' }}</span>

                                    <label>Phone Line:</label>
                                    <span>{{ currentPlanDetails?.phoneLine || '' }}</span>
                                </div>
                            </div>
                        </div>
                            <!-- Update Section (Editable) -->
                            <div class="new-data">
                                <h3>Update</h3>
                                <form @submit.prevent="addNewPlan">
                                    <label for="type">Package Type:</label>
                                    <div class="custom-dropdown">
                                        <select id="type" v-model="newPlan.type" @change="fetchCurrentDetails" required>
                                            <option v-for="type in types" :key="type.id" :value="type.id">
                                                {{ type.planName }}
                                            </option>
                                        </select>
                                    </div>

                                    <label for="setupCharge">Setup Charge:</label>
                                    <input type="text" id="setupCharge" v-model="newPlan.setupCharge" required />

                                    <label for="phoneLine">Phone Line:</label>
                                    <input type="text" id="phoneLine" v-model="newPlan.phoneLine" required />

                                    <button type="submit">Confirm</button>
                                </form>
                            </div>

                            <!-- Current Section (Shows only when a package is selected) -->
                           
                        </el-row>
                    </el-card>
                </el-plan>

                <p><img src="/copyright.png"> 2024, ipNX Nigeria Limited</p>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ElContainer, ElAside, ElHeader, ElMain, ElCard, ElRow, ElMessage } from 'element-plus';
import SideBarVue from '@/components/SideBar.vue';
import apiClient from '@/axios.js';

export default {
    components: {
        SideBarVue,
        ElContainer,
        ElAside,
        ElHeader,
        ElMain,
        ElCard,
        ElRow
    },
    data() {
        return {
            newPlan: {
                type: '', // This will hold the selected package ID
                setupCharge: '',
                phoneLine: '',
                planName: ''
            },
            currentPlanDetails: null, // Stores current setupCharge and phoneLine of the selected plan
            types: [] // Initialize as an empty array to hold all plan types
        };
    },
    methods: {
        async fetchTypes() {
            try {
                const response = await apiClient.get('/Plans/view-all-plans');
                this.types = response.data;
            } catch (error) {
                console.error('Error fetching plan types:', error);
                ElMessage.error('Failed to load plan types.');
            }
        },

        async fetchCurrentDetails() {
            try {
                // Find the selected type from the types array
                const selectedType = this.types.find(type => type.id === this.newPlan.type);
                if (selectedType) {
                    // Update currentPlanDetails with the correct values from the API response
                    this.currentPlanDetails = {
                        planName: selectedType.planName || 'N/A', // Add planName
                        setUpCharge: selectedType.setUpCharge || 'N/A',  // Use setUpCharge from the API response
                        phoneLine: selectedType.phoneLine || 'N/A' // Use phoneLine from the API response
                    };

                    // Pre-fill the update form fields with the current data
                    this.newPlan.setupCharge = selectedType.setUpCharge || '';
                    this.newPlan.phoneLine = selectedType.phoneLine || '';
                } else {
                    this.currentPlanDetails = null; // Clear if no type is selected
                }
            } catch (error) {
                console.error('Error fetching current plan details:', error);
                ElMessage.error('Failed to load current plan details.');
            }
        },

        async addNewPlan() {
            try {
                const url = `/Plans/admin/update-a-plan/${this.newPlan.type}`;

                // Find the selected plan name based on the selected type ID
                const selectedType = this.types.find(type => type.id === this.newPlan.type);
                const planName = selectedType ? selectedType.planName : '';

                const response = await apiClient.put(url, {
                    setupCharge: this.newPlan.setupCharge,
                    phoneLine: this.newPlan.phoneLine,
                    planName: planName
                });

                ElMessage.success('Plan updated successfully.');

                // Reset the form fields and current details
                this.newPlan = {
                    type: '',
                    setupCharge: '',
                    phoneLine: '',
                    planName: ''
                };
                this.currentPlanDetails = null;

                window.location.reload(); // Reload the page to reflect changes

            } catch (error) {
                console.error('Error updating plan:', error);
                ElMessage.error('Failed to update plan.');
            }
        }
    },
    mounted() {
        this.fetchTypes(); // Fetch available plan types on mount
    }
};
</script>



<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
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
    height: 69vh;
    margin-left: 4vw;
    margin-top: 20px;
}


.old-data,
.new-data {
    padding: 0 30px;
    display: inline-block;
    margin: 0px;
    font-size: 12px;
}

.plans {
    margin-bottom: 20px;
    width: 75vw;
    margin-left: -70px;
}


label {
    display: flex;
    margin-top: 3px;
    font-size: 16px;
}

h2 {
    font-size: 13px;
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;
    font-weight: bolder;
}

h3 {
    font-size: 20px;
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
    border-radius: 0px;
    padding: 16px 90px;
    font-weight: bolder;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 50px;
    font-family: "Roboto", sans-serif;
    border: none;
    margin-left: -60%;
}

.button1 {
    text-decoration: none;
    width: 54vw;
    margin-bottom: 2vh;
    padding: 10px 30px;
    background-color: #DA1919;
    border: 0px solid;
    border-radius: 5px;
    height: 35vh;
    cursor: pointer;
    color: white;
    margin-left: 63vw;
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
    padding-left: 60px;
}

select {
    width: 250px;
    height: 20px;
    border-bottom: 2px solid black;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    /* text-align: right; */
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

.custom-dropdown {
    color: black;
    justify-content: left;
    text-align: left;
}

@media (min-width: 768px) and (max-width: 992px) {

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
        height: 90vh;
    }

    .old-data,
    .new-data {
        font-size: 15px;
        margin: 0;
    }

    h3,
    h2 {
        font-size: 16px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: -70%;
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
        height: 80vh;
        margin-left: -30px;

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
        height: 80vh;
        margin-left: -30px;
    }

    .old-data,
    .new-data {
        font-size: 9px;
        margin: 0;
        padding: 18px;
        width: 60%;
    }

    label,
    input,
    select {

        width: 190%;

    }


    h3,
    h2 {
        font-size: 16px;
    }

    button {
        align-items: center;
        justify-content: center;
        margin-left: 0px;
    }

    .aside {
        width: 30vw;
    }
}
</style>
