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
                            <h4>Price Configuration</h4>
                        </div>

                        <div style="padding:50px 15px; width: 85vw;">
                            <div style="float: right; position: relative;">
                                <el-icon style="margin: 7px 5px;"></el-icon>
                            </div>
                        </div>
                    </div>
                </el-header>

                <el-main>
                    <div>
                        <el-card class="plans">
                            <router-link to="/smeplan" class="planbox">SME BROADBAND</router-link>
                            <router-link to="/priceconfig" class="planbox">RESIDENTIAL BROADBAND</router-link>
                            <router-link to="/xtremeplan" class="planbox">XTREME SERIES</router-link>
                            <router-link to="/promoconfig" class="planbox1">PROMO CONFIG</router-link>
                        </el-card>
                        <el-card class="view">
                            <el-row class="container">
                                <div class="old-data">
                                    <h3>Discount</h3>
                                    <form @submit.prevent="addNewPlan">
                                        <label for="type">Package Type:</label>
                                        <div class="custom-dropdown">
                                            <select id="type" v-model="newPlan.type" required>
                                                <option v-for="type in types" :key="type.planTypeId"
                                                    :value="type.planTypeId">
                                                    {{ type.planTypeName }}
                                                </option>
                                            </select>
                                        </div>

                                        <label for="state">State:</label>
                                        <input type="text" id="state" v-model="newPlan.state" required />

                                        <label for="city">City:</label>
                                        <input type="text" id="city" v-model="newPlan.city" required />

                                        <label for="street">Street:</label>
                                        <input type="text" id="street" v-model="newPlan.street" required />

                                        <label for="discount">Discount:</label>
                                        <input type="number" id="discount" v-model="newPlan.percentage" required />

                                        <button type="submit">Confirm</button>
                                    </form>
                                </div>
                            </el-row>
                        </el-card>
                    </div>
                </el-main>

                <p><img src="/copyright.png" alt="Copyright"> 2024, ipNX Nigeria Limited</p>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ElContainer, ElAside, ElHeader, ElMain, ElCard, ElRow, ElMessage, ElLoading } from 'element-plus';
import SideBarVue from '@/components/SideBar.vue';
import apiClient from '@/axios.js';
import { ref, reactive, onMounted } from 'vue';

export default {
    components: {
        SideBarVue,
        ElContainer,
        ElAside,
        ElHeader,
        ElMain,
        ElCard,
        ElRow,
    },
    setup() {
        const newPlan = reactive({
            type: '',
            state: '',
            city: '',
            street: '',
            percentage: ''
        });
        const types = ref([]);
        const loadingPlans = ref(true);

        const fetchTypes = () => {
            apiClient.get('/Plans/admin/view-all-planTypes')
                .then(response => {
                    // Filter plan types to only include those that are active
                    types.value = response.data.filter(type => type.isActive === "True");
                    console.log('Filtered types:', types.value);
                })
                .catch(error => {
                    console.error('Error fetching plan types:', error);
                    ElMessage.error('Failed to load plan types.');
                })
                .finally(() => {
                    loadingPlans.value = false;
                });
        };

        const addNewPlan = async () => {
            const payload = {
                planTypeId: newPlan.type,
                state: newPlan.state,
                city: newPlan.city,
                street: newPlan.street,
                percentage: parseFloat(newPlan.percentage) // Ensure discount is a number
            };

            console.log('Payload:', payload); // Log the payload for debugging

            const loadingInstance = ElLoading.service({
                lock: true,
                text: 'Adding Discount...',
                background: 'rgba(0, 0, 0, 0.7)',
            });

            try {
                const response = await apiClient.post('/Discount/admin/add-a-discount', payload);
                console.log('API Response:', response);
                ElMessage.success('Discount added successfully.');

                // Reset form
                newPlan.type = '';
                newPlan.state = '';
                newPlan.city = '';
                newPlan.street = '';
                newPlan.percentage = '';

            } catch (error) {
                if (error.response && error.response.data) {
                    console.error('Error response data:', error.response.data); // Log error response data
                }
                console.error('Error adding new plan:', error);
                ElMessage.error('Failed to add discount.');
            } finally {
                loadingInstance.close();
            }
        };

        onMounted(fetchTypes);

        return {
            newPlan,
            types,
            loadingPlans,
            fetchTypes,
            addNewPlan
        };
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
    padding: 0 60px;
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
        margin-left: 30px;
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