<template> 
    <div class="common-layout">
        <el-container>
            <!-- Sidebar -->
            <el-aside width="15vw" style="height: 100vh;">
                <SideBarVue />
            </el-aside>

            <el-container>
                <!-- Header -->
                <el-header>
                    <div class="box">
                        <h4>Plans</h4>
                        <div class="inputcon">
                            <el-input class="inputs" v-model="searchInput" type="text" name="search"
                                placeholder="Search.." prefix-icon="search"></el-input>
                        </div>
                    </div>
                </el-header>

                <!-- Main Content -->
                <el-main style="height: 79vh; width: 85vw; padding: 0vh 0vw 0vh 0.5vw; margin-top: -30px">
                    <!-- Table -->
                    <el-table class="t1" :data="displayedCustomers" style="font-size:12px; line-height: 0.5vh;">
                        <el-table-column type="selection" width="50" label-class-name="clab"></el-table-column>
                        <el-table-column prop="planTypeName" label="Plan Type" width="150" label-class-name="clab">
                            <template v-slot="{ row }">
                                {{ row.planTypeName }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="packageName" label="Package Name" width="100"
                            label-class-name="clab"></el-table-column>
                        <el-table-column prop="price" label="Price" width="100" :formatter="formatPrice"
                            label-class-name="clab"></el-table-column>
                        <el-table-column prop="speed" label="Speed" width="120"
                            label-class-name="clab"></el-table-column>
                        <el-table-column prop="paymentCycle" label="Payment Cycle" width="130"
                            label-class-name="clab"></el-table-column>
                        <el-table-column prop="dataAllowance" label="Data Allowance" width="130"
                            label-class-name="clab"></el-table-column>
                        <el-table-column prop="setupCharge" label="Setup Charge" width="100" :formatter="formatPricey"
                            label-class-name="clab"></el-table-column>

                        <el-table-column prop="status" label="Status" width="130" label-class-name="clab">
                            <template v-slot="{ row }">
                                <span :style="getStatusStyle(row.status)">{{ row.status }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Action" label-class-name="clab">
                            <template #default="{ row }">
                                <el-button type="text" @click="toggleSidebar(row)">
                                    <el-icon color="black">
                                        <More />
                                    </el-icon>
                                </el-button>
                                <el-aside class="sidebar" v-show="row.showSidebar">
                                    <div class="prompt">
                                        <div class="row-wrapper">
                                            <div>
                                                <el-icon id="icon" @click="toggleSidebar(row)">
                                                    <Close />
                                                </el-icon>
                                            </div>
                                            <button class="button"
                                                @click="handlePauseResume(row)">Activate/Deactivate</button>
                                        </div>
                                    </div>
                                </el-aside>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-main>

                <!-- Pagination -->
                <el-footer style="height: 5vh;">
                    <el-pagination small background class="custom-pagination" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="paginationOptions.currentPage"
                        :page-sizes="paginationOptions.pageSizes" :page-size="paginationOptions.pageSize"
                        :total="paginationOptions.total" layout="sizes, prev, pager, next," 
                        style="position: fixed; right: 0px;"></el-pagination>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { ElMessage, ElTable, ElTableColumn, ElPagination, ElLoading } from 'element-plus';
import SideBarVue from '@/components/SideBar.vue';

export default {
    name: 'DiscountList',
    components: {
        SideBarVue,
        ElTable,
        ElTableColumn,
        ElPagination
    },
    setup() {
        const searchInput = ref('');
        const customers = ref([]);
        const sortOrder = ref('asc');
        const paginationOptions = ref({
            pageSize: 10,
            currentPage: 1,
            total: 0,
            pageSizes: [5, 10, 15, 20]
        });
        const displayedCustomers = ref([]);

        const formatPrice = (row, column, cellValue) => {
            if (typeof cellValue !== 'number') {
                return cellValue;
            }
            return cellValue.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }).replace('NGN', '₦').trim();
        };

        const formatPricey = (row, column, cellValue) => {
            const value = parseFloat(cellValue);
            if (isNaN(value)) {
                return cellValue;
            }
            return cellValue.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }).replace('NGN', '₦').trim();
        };

        // Dummy data instead of API call
        const dummyData = [
            {
                id: 1,
                planTypeName: 'Basic Plan',
                packageName: 'Small Package',
                price: 1000,
                speed: '10 Mbps',
                paymentCycle: 'Monthly',
                dataAllowance: '10GB',
                setupCharge: 500,
                status: 'True',
                showSidebar: false
            },
            {
                id: 2,
                planTypeName: 'Premium Plan',
                packageName: 'Large Package',
                price: 2000,
                speed: '20 Mbps',
                paymentCycle: 'Yearly',
                dataAllowance: '50GB',
                setupCharge: 1000,
                status: 'False',
                showSidebar: false
            }
        ];

        const filteredCustomers = computed(() => {
            const search = searchInput.value.toLowerCase();
            return customers.value.filter(customer => {
                const planTypeName = customer.planTypeName ? customer.planTypeName.toLowerCase() : '';
                const speed = customer.speed ? customer.speed.toLowerCase() : '';
                const status = customer.status ? customer.status.toLowerCase() : '';
                const dataAllowance = customer.dataAllowance ? customer.dataAllowance.toLowerCase() : '';
                const packageName = customer.packageName ? customer.packageName.toLowerCase() : '';

                return (
                    planTypeName.includes(search) ||
                    speed.includes(search) ||
                    status.includes(search) ||
                    dataAllowance.includes(search) ||
                    packageName.includes(search)
                );
            });
        });

        const sortCustomers = () => {
            const sortedCustomers = [...filteredCustomers.value];
            sortedCustomers.sort((a, b) => {
                if (sortOrder.value === 'asc') {
                    return a.packageName.localeCompare(b.packageName);
                } else {
                    return b.packageName.localeCompare(a.packageName);
                }
            });

            const startIndex = (paginationOptions.value.currentPage - 1) * paginationOptions.value.pageSize;
            const endIndex = startIndex + paginationOptions.value.pageSize;
            displayedCustomers.value = sortedCustomers.slice(startIndex, endIndex);
            paginationOptions.value.total = filteredCustomers.value.length;
        };

        watchEffect(() => {
            sortCustomers();
        });

        // Initialize with dummy data
        onMounted(() => {
            customers.value = dummyData;
        });

        return {
            searchInput,
            sortOrder,
            formatPrice,
            formatPricey,
            displayedCustomers,
            paginationOptions,
            handleSizeChange: async (pageSize) => {
                paginationOptions.value.pageSize = pageSize;
                await sortCustomers();
            },
            handleCurrentChange: async (currentPage) => {
                paginationOptions.value.currentPage = currentPage;
                await sortCustomers();
            },
            getStatusStyle: (status) => {
                const backgroundColor = status === 'True' ? '#008000' : '#DC3545';
                return {
                    backgroundColor,
                    display: 'inline-block',
                    borderRadius: '25px',
                    width: '6vw',
                    textAlign: 'center',
                    padding: '0vh 0vw',
                    color: 'white',
                    fontSize: '12px',
                };
            },
            toggleSidebar: (row) => {
                row.showSidebar = !row.showSidebar;
            },
            handlePauseResume: async (row) => {
                // Simulating status toggle without actual API call
                row.status = row.status === 'True' ? 'False' : 'True';
            }
        };
    }
};
</script>

<style scoped>
.common-layout {
    font-family: 'Roboto', sans-serif;
    color: black;
}

.sidebar {
    position: relative;
    top: 0px;
    right: 0px;
    width: 15vw;
    box-shadow: 4px -4px 9px rgba(0, 0, 0, 0.1);
    /* Add more styles as needed */
}

.row-wrapper {
    position: relative;
}

.prompt {
    background-color: white;
    width: 15vw;
    height: 20vh;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
}

.prompt button {
    width: 14vw;
    margin-bottom: 2vh;
    background-color: white;
    border: 1px solid #DC3545;
    border-radius: 50px;
    height: 5vh;
    cursor: pointer;
}


.button:hover {
    background-color: #DC3545;
    color: white;
}

.dropdown-menu {
    min-width: 150px;
    color: black;
    padding: 2px 0px;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
}

ul {
    list-style-type: none;
    /* Removes default bullet points */
}

.dropdown-toggle {
    background-color: transparent;
    border: none;
    text-decoration: none;
    font-size: 20px;
    cursor: pointer;
    background-color: transparent;
    color: #20a0ff;
    text-align: left;
}

.el-dropdown-menu {
    background-color: #000000;
    /* Background color */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    /* Box shadow for dropdown */
    border-radius: 4px;
    /* Rounded corners */
    padding: 8px 0;
    /* Padding inside the menu */
}

.my-dropdown .el-dropdown-menu {
    background-color: #ff2020;
    border: 1px solid #ccc;
}

/* Example: Adjusting dropdown menu position */
.el-dropdown-menu.is-right {
    right: 0;
    /* Positioning the dropdown menu to the right */
}

.el-dropdown-menu.is-left {
    left: 0;
    /* Positioning the dropdown menu to the left */
}

.el-dropdown-item {
    color: #333;
    /* Text color */
    padding: 10px 20px;
    /* Padding inside each item */
    transition: background-color 0.3s;
    /* Smooth background color transition */
}

.el-dropdown-item:hover {
    background-color: #c91212;
    /* Background color on hover */
}

/* Example of targeting a specific dropdown item */
.el-dropdown-item.command-edit {
    color: #007bff;
    /* Specific color for 'Edit' item */
}

.el-dropdown-link {
    cursor: pointer;
    /* Pointer cursor on the link */
    padding: 10px;
    /* Padding around the link */
    display: inline-block;
    color: #333;
    /* Text color of the link */
}

.el-icon-arrow-down {
    margin-left: 5px;
    /* Adjusting spacing between link text and arrow */
}


.el-header {
    width: 100vw;
    height: 15vh;
    padding: 0px;
    background-color: white;
    margin-right: 0px;
}

.el-footer p {
    font-size: 14px;
    line-height: 140%;
}

.popup-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent overlay */
    z-index: 9999;
    /* Ensure popup is above other content */
}

.popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.popup h3 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #333;
}

.popup-buttons {
    text-align: right;
    margin-top: 20px;
}

.popup-buttons el-button {
    margin-left: 10px;
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
    /* font-weight: 600; */
    font-style: normal;
    font-size: 14px;
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
    margin-left: -399px;

}

.img {
    flex: 1;
    margin: 0vh 0vw 0vh 33.5vw;
    flex-shrink: 0;
}

.sidebar {
    position: fixed;
    top: 0px;
    right: 0px;
    width: 15vw;
    box-shadow: 4px -4px 9px rgba(0, 0, 0, 0.1);
    /* z-index:5; */
}

.getStatusStyle {
    borderRadius: 25px;
    width: 6vw;
    text-align: center;
    padding: 0vh 0vw;
    color: white;
    fontSize: 12px;
}

#icon {
    font-size: 25px;
    color: black;
    margin: 2vh 0vw;
}

.prompt {
    background-color: white;
    width: 15vw;
    height: 40vh;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
}

.button1 {
    text-decoration: none;
    width: 9vw;
    background-color: #DA1919;
    border: 0px solid;
    border-radius: 5px;
    height: 5vh;
    cursor: pointer;
    color: white;
    margin-left: 65vw;
    font-size: 14px;
    text-align: center;
}


.prompt button {
    width: 14vw;
    margin-bottom: 2vh;
    background-color: white;
    border: 1px solid #DC3545;
    border-radius: 50px;
    height: 5vh;
    cursor: pointer;
}

.button:hover {
    background-color: #DC3545;
    color: white;
}


.el-pager li.is-active {
    color: green;
    cursor: default;
    font-weight: 700;
}

.t1 {
    height: 79vh;
    width: 84vw;
    color: #646464;
}

.clab {
    font-size: 1.8vh;
    font-weight: 1200;
    color: #460600;
}

@media (min-width: 481px) and (max-width: 767px) {
    .inputcon {
        flex: 1;
        margin: 0vh 0vw 0vh 2vw;
    }

    .t1 {
        margin-left: -1%;
    }

    .img {
        flex: 1;
        margin: 0vh 0vw 0vh 5vw;
    }

    /* .el-main{
            margin: 0vh -8vw;
        } */

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

    .aside {
        width: 15vw;
    }

    /* .el-main{
            margin: 0vh -8vw;
        } */
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
        margin: 0vh 5vw;
    }
}
</style>