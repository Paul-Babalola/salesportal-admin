<template>
  <div class="common-layout">
    <el-container>
      <!-- Sidebar -->
      <el-aside width="15vw" style="height: 100vh;">
        <SideBarVue />
      </el-aside>

      <el-container>
        <!-- Add Discount Popup -->
        <el-dialog v-model="showPopup" title="Add Discount">
          <el-form :model="newPlan" :ref="newPlanForm" label-width="120px">
            <el-form-item label="Type:" prop="planTypeIds">
              <el-select v-model="newPlan.planTypeIds" placeholder="Select Plan Type" multiple @change="handleSelectAll">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="plan in planTypes" :key="plan.id" :label="plan.planTypeName" :value="plan.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="State:" prop="state">
              <el-select v-model="newPlan.state" multiple @change="handleStateChange">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="state in states" :key="state" :label="state" :value="state"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="City:" prop="city">
              <el-select v-model="newPlan.city" multiple @change="handleCityChange" :disabled="!newPlan.state.length">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="city in cities" :key="city" :label="city" :value="city"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Street:" prop="street">
              <el-select v-model="newPlan.street" multiple @change="handleStreetChange" :disabled="!newPlan.city.length">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="street in streets" :key="street" :label="street" :value="street"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Start Date:" prop="startDate">
              <el-date-picker v-model="newPlan.startDate" type="datetime" placeholder="Select start date and time"></el-date-picker>
            </el-form-item>

            <el-form-item label="End Date:" prop="endDate">
              <el-date-picker v-model="newPlan.endDate" type="datetime" placeholder="Select end date and time"></el-date-picker>
            </el-form-item>

            <el-form-item label="Percentage:" prop="percentage">
              <el-input v-model.number="newPlan.percentage"></el-input>
            </el-form-item>
          </el-form>

          <div class="popup-buttons">
            <el-button @click="closeAddDiscountPopup">Cancel</el-button>
            <el-button type="primary" @click="addDiscount">Add</el-button>
          </div>
        </el-dialog>

        <!-- Edit Discount Popup -->
        <el-dialog v-model="showEditPopup" title="Edit Discount" :visible="showEditPopup" @close="closeEditPopup">
          <el-form :model="editedDiscount" ref="editedDiscountForm" label-width="120px">
            <el-form-item label="Type:" prop="planTypeName">
              <span>{{ editedDiscount.planTypeName }}</span>
            </el-form-item>

            <el-form-item label="State:" prop="state">
              <el-select v-model="editedDiscount.state" multiple @change="handleStateChange">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="state in states" :key="state" :label="state" :value="state"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="City:" prop="city">
              <el-select v-model="editedDiscount.city" multiple @change="handleCityChange" :disabled="!editedDiscount.state.length">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="city in cities" :key="city" :label="city" :value="city"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Street:" prop="street">
              <el-select v-model="editedDiscount.street" multiple @change="handleStreetChange" :disabled="!editedDiscount.city.length">
                <el-option label="Select All" value="all"></el-option>
                <el-option v-for="street in streets" :key="street" :label="street" :value="street"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Start Date:" prop="startDate">
              <el-date-picker v-model="editedDiscount.startDate" type="datetime" placeholder="Select start date"></el-date-picker>
            </el-form-item>

            <el-form-item label="End Date:" prop="endDate">
              <el-date-picker v-model="editedDiscount.endDate" type="datetime" placeholder="Select end date"></el-date-picker>
            </el-form-item>

            <el-form-item label="Percentage:" prop="percentage">
              <el-input v-model.number="editedDiscount.percentage"></el-input>
            </el-form-item>
          </el-form>

          <div class="popup-buttons">
            <el-button @click="closeEditPopup">Cancel</el-button>
            <el-button type="primary" @click="saveEditedDiscount">Save</el-button>
          </div>
        </el-dialog>

        <!-- Header -->
        <el-header>
          <div class="box">
            <h4>Discounts</h4>
            <div class="inputcon">
              <el-input class="inputs" v-model="searchInput" type="text" name="search" placeholder="Search.."
                prefix-icon="search"></el-input>
            </div>
          </div>

          <div style="padding: 18px 0px; width: 85vw;">
            <span style="padding: 0px 10px;">All</span>
            <el-icon style="margin: 0px 5px; position: relative; top: 2px;">
              <CaretBottom />
            </el-icon>
            <el-button class="button1" type="primary" @click="openAddDiscountPopup">Add Discount</el-button>
          </div>

          <div style="float: right; position: relative;">
            <el-icon style="margin: 2px 5px;">
              <Filter />
            </el-icon>
          </div>
          <hr style="margin: 10px 0px 0px 0px; height: 1px; background-color: #ccc; border: none;" />
        </el-header>

        <el-main>
          <!-- Table -->
          <el-table :data="filteredDiscounts" style="width: 100%">
            <el-table-column prop="planTypeName" label="Plan Type"></el-table-column>
            <el-table-column prop="state" label="State"></el-table-column>
            <el-table-column prop="city" label="City"></el-table-column>
            <el-table-column prop="street" label="Street"></el-table-column>
            <el-table-column prop="startDate" label="Start Date"></el-table-column>
            <el-table-column prop="endDate" label="End Date"></el-table-column>
            <el-table-column prop="percentage" label="Discount (%)"></el-table-column>
            <el-table-column prop="status" label="Status">
              <template v-slot="{ row }">
                <span :style="getStatusStyle(row.status)">{{ row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Action">
              <template v-slot="scope">
                <el-button type="text" @click="openEditDiscount(scope.row)">Edit</el-button>
                <el-button type="text" @click="deleteDiscount(scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

        <!-- Pagination -->
        <el-footer>
          <el-pagination @current-change="handleCurrentPageChange" :total="totalItems" :page-size="pageSize" layout="prev, pager, next"></el-pagination>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import SideBarVue from '@/components/SideBar.vue';

export default {
  name: 'DiscountList',
  components: {
    SideBarVue,
  },
  setup() {
    const showPopup = ref(false);
    const showEditPopup = ref(false);
    const discounts = ref([]);
    const newPlan = reactive({
      planTypeIds: [],
      state: [],
      city: [],
      street: [],
      startDate: null,
      endDate: null,
      percentage: null,
    });
    const editedDiscount = reactive({
      id: null,
      planTypeName: '',
      state: [],
      city: [],
      street: [],
      startDate: null,
      endDate: null,
      percentage: null,
      status: '',
    });
    const states = ref(['State 1', 'State 2', 'State 3']);
    const cities = ref(['City 1', 'City 2', 'City 3']);
    const streets = ref(['Street 1', 'Street 2', 'Street 3']);
    const planTypes = ref([
      { id: 1, planTypeName: 'Plan A' },
      { id: 2, planTypeName: 'Plan B' },
      { id: 3, planTypeName: 'Plan C' },
    ]);
    const searchInput = ref('');
    const pageSize = ref(10);
    const totalItems = ref(0);

    // Fetching data or initializing data for testing purposes
    onMounted(() => {
      discounts.value = [
        { planTypeName: 'Plan A', state: 'State 1', city: 'City 1', street: 'Street 1', startDate: '2025-05-01', endDate: '2025-06-01', percentage: 10, status: 'Active' },
        { planTypeName: 'Plan B', state: 'State 2', city: 'City 2', street: 'Street 2', startDate: '2025-06-01', endDate: '2025-07-01', percentage: 15, status: 'Inactive' },
        { planTypeName: 'Plan C', state: 'State 3', city: 'City 3', street: 'Street 3', startDate: '2025-07-01', endDate: '2025-08-01', percentage: 20, status: 'Active' }
      ];
      totalItems.value = discounts.value.length; // Set total items for pagination
    });

    const filteredDiscounts = computed(() => {
      return discounts.value.filter(discount => {
        return (
          discount.planTypeName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          discount.state.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          discount.city.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          discount.street.toLowerCase().includes(searchInput.value.toLowerCase())
        );
      });
    });

    const openAddDiscountPopup = () => {
      showPopup.value = true;
    };

    const closeAddDiscountPopup = () => {
      showPopup.value = false;
      resetNewPlan();
    };

    const resetNewPlan = () => {
      newPlan.planTypeIds = [];
      newPlan.state = [];
      newPlan.city = [];
      newPlan.street = [];
      newPlan.startDate = null;
      newPlan.endDate = null;
      newPlan.percentage = null;
    };

    const addDiscount = () => {
  // Create a new discount object from the form data
  const newDiscount = {
    planTypeName: planTypes.value.find(plan => newPlan.planTypeIds.includes(plan.id))?.planTypeName || '',
    state: newPlan.state.join(', '),
    city: newPlan.city.join(', '),
    street: newPlan.street.join(', '),
    startDate: newPlan.startDate ? newPlan.startDate.toISOString().slice(0, 19).replace('T', ' ') : '',
    endDate: newPlan.endDate ? newPlan.endDate.toISOString().slice(0, 19).replace('T', ' ') : '',
    percentage: newPlan.percentage,
    status: 'Active',  // Default status, you can adjust based on logic
  };

  // Add the new discount to the list
  discounts.value.push(newDiscount);

  // Optionally, reset the form for new entries
  Object.assign(newPlan, {
    planTypeIds: [],
    state: [],
    city: [],
    street: [],
    startDate: null,
    endDate: null,
    percentage: null,
  });

  // Close the add discount popup
  closeAddDiscountPopup();

  // Show a success message
  ElMessage.success('Discount added successfully!');
};


    const openEditDiscount = (discount) => {
      editedDiscount.id = discount.id;
      editedDiscount.planTypeName = discount.planTypeName;
      editedDiscount.state = discount.state;
      editedDiscount.city = discount.city;
      editedDiscount.street = discount.street;
      editedDiscount.startDate = discount.startDate;
      editedDiscount.endDate = discount.endDate;
      editedDiscount.percentage = discount.percentage;
      editedDiscount.status = discount.status;
      showEditPopup.value = true;
    };

    const closeEditPopup = () => {
      showEditPopup.value = false;
    };

    const saveEditedDiscount = () => {
      // Logic to save edited discount
      closeEditPopup();
      ElMessage.success('Discount updated successfully!');
    };

    const deleteDiscount = (discount) => {
      const index = discounts.value.indexOf(discount);
      if (index !== -1) {
        discounts.value.splice(index, 1);
      }
      ElMessage.success('Discount deleted successfully!');
    };

    const handleStateChange = () => {};
    const handleCityChange = () => {};
    const handleStreetChange = () => {};

    const getStatusStyle = (status) => {
      return status === 'Active' ? 'color: green' : 'color: red';
    };

    return {
      showPopup,
      showEditPopup,
      discounts,
      newPlan,
      editedDiscount,
      states,
      cities,
      streets,
      planTypes,
      searchInput,
      pageSize,
      totalItems,
      filteredDiscounts,
      openAddDiscountPopup,
      closeAddDiscountPopup,
      addDiscount,
      openEditDiscount,
      closeEditPopup,
      saveEditedDiscount,
      deleteDiscount,
      handleStateChange,
      handleCityChange,
      handleStreetChange,
      getStatusStyle,
    };
  },
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
  height: 40vh;
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


.hover-list-wrapper {
  position: relative;
}

.hover-list {
  max-height: 40px; /* Adjust as needed */
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.hover-list.expanded {
  max-height: none; /* Allows full expansion */
}

.more-items-msg {
  color: #999; /* Adjust color as needed */
  cursor: pointer;
}

.more-items-msg {
  font-size: 12px;
  color: #888;
  cursor: pointer;
  margin-left: 5px;
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
