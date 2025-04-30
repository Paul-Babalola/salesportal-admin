<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="15vw" style="height: 100vh;">
        <SideBarVue />
      </el-aside>

      <el-container>
        <el-header>
          <div class="box">
            <h4>Customers</h4>
            <div class="inputcon">
              <el-input class="inputs" v-model="searchInput" type="text" name="search" placeholder="Search.."
                prefix-icon="Search"></el-input>
            </div>
            <div class="img">
              <img src="../assets/dashboard/icon1.png" alt="" style="width: 25px; height: auto;">
            </div>
          </div>

          <div style="padding: 18px 0px; width: 85vw;">
            <div style="display: flex;">
              <span style="padding:0px 10px;">All ({{ numberOfCustomers }})</span><el-icon style="margin: 5px 5px; ">
                <CaretBottom />
              </el-icon>
              <el-input class="input2" type="text" v-model="nameInput" placeholder="Customer Name" suffix-icon="Search"
                style="margin: 5px 5px;"></el-input>
              <el-input class="input2" type="text" v-model="dateInput" placeholder="Date" suffix-icon="Search"
                style="margin: 5px 5px;"></el-input>
              <el-input class="input2" type="text" v-model="statusInput" placeholder="Status" suffix-icon="Search"
                style="margin: 5px 5px;"></el-input>
              <el-input class="input2" type="text" v-model="idInput" placeholder="Customer Order Id"
                suffix-icon="Search" style="margin: 5px 5px;"></el-input>
            </div>
            <!-- <div style="float: right; position: relative; top: -4vh; right:0.5vw;">
              <el-icon @click="toggleSort"><Sort/> </el-icon>
            </div>  -->

            <hr style="margin: 10px 0px 0px 0px; height: 1px; background-color: #ccc; border: none;">
          </div>
        </el-header>


        <el-main style="height: 79vh; width: 85vw; padding: 0vh 0vw 0vh 0.5vw;">
          <el-table class="t1" :data="filteredCustomers" style="font-size:12px; line-height: 0.5vh;">
            <el-table-column type="selection" width="50" label-class-name="clab"></el-table-column>
            <!-- <el-table-column prop="image" label="Image" width="60" label-class-name="clab">
              <template v-slot="{ row }">
                <img :src="row.image" alt="Image" style="width: 20px; height: 20px; border-radius: 25px;">
              </template>
</el-table-column> -->
            <el-table-column prop="name" label="Names" width="240" label-class-name="clab" sortable
              :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="formattedDateOrdered" label="Date" width="150" label-class-name="clab" sortable
              :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="orderId" label="ID" width="130" label-class-name="clab" sortable
              :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="whoReferredYou" label="Referred By" width="170" label-class-name="clab" sortable
              :sort-orders="['ascending', 'descending']"></el-table-column>
            <el-table-column prop="amount" label="Amount" width="120" label-class-name="clab"></el-table-column>
            <el-table-column prop="status" label="Status" width="140" label-class-name="clab">
              <template v-slot="{ row }">
                <span :style="getStatusStyle(row.status)">{{ row.status }}</span>
              </template>
            </el-table-column>

            <el-table-column label="Action" label-class-name="clab">
              <template #default="{ row }">
                <el-button type="text" @click="toggleSidebar(row.orderId, row.status)">
                  <el-icon color="black">
                    <More />
                  </el-icon>
                </el-button>
                <el-aside class="sidebar" v-show="showSidebar">
                  <div class="prompt">
                    <div><el-icon id="icon" @click="toggleSidebar(null)">
                        <Close />
                      </el-icon></div>
                    <button class="button" style="" @click="navigateSOF('generate')">Generate SOF</button>
                    <button class="button" style="margin-bottom: 4vh;" @click="sendReceiptByEmail(selectedUserId)"
                      :disabled="selectedStatus === 'Pending'">Send Receipt</button>
                    <button class="button" @click="downloadForm(selectedUserId)">Download SOF</button>
                    <button class="button" @click="downloadReceipt(selectedUserId)"
                      :disabled="selectedStatus === 'Pending'">
                      Download Receipt</button>
                  </div>
                </el-aside>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

        <el-footer style="height: 5vh;">
          <el-pagination small background class="custom-pagination" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="paginationOptions.currentPage"
            :page-sizes="paginationOptions.pageSizes" :page-size="paginationOptions.pageSize"
            :total="paginationOptions.total" layout="sizes, prev, pager, next," style="position: fixed; right: 0px;">
          </el-pagination>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElIcon, ElHeader, ElInput, ElRow, ElCol, ElLoading, ElMessage } from 'element-plus'
import { ref, watchEffect, computed, onMounted } from 'vue';
import SideBarVue from '@/components/SideBar.vue';
import apiClient from '@/axios.js';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';

const router = useRouter();

name: 'CustomerList'

interface customer {
  image: string | null;
  name: string;
  dateOrdered: string;
  formattedDateOrdered: string;
  amount: string;
  orderId: string;
  status: string;
  whoReferredYou: string;
}

interface Details {
  orderReferenceNumber: string; //not name in endpoint
  paymentReferenceNumber: string;
  orderDateAndTime: string;
  customerType: string;
  planName: string;
  termsAndConditions: string;
  planTypeName: string;
  price: string;
  planModemAndInstallationAmount: string;
  months: string;
  whoReferredYou: string;
  salesAgentName: string;
  customerName: string;
  gender: string;
  dateOfBirth: string;
  formattedDateOrdered: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  address: string;
  typeOfBuilding: string;
  billingInformation: string;
  photograph: string | null;
  governmentID: string | null;
  utilityBill: string | null;
  personalDataConsent: string;
  privacyPolicy: string;
  certificateOfIncorporation: string | null;
  letterOfIntroduction: string | null;
  typeOfBusiness: string;
  addressOfBusiness: string;
}

const customers = ref<customer[]>([]);
const details = ref<Details[]>([]);

const metadata = ref({ totalCount: 0 });

const loadingInstance = ref(null)

// const fetchData = async () => {
//   try {
//     let cachedData = localStorage.getItem('customerOrders');
//     if (cachedData) {
//       const data = JSON.parse(cachedData);
//       displayCustomerOrders(data);
//     }

//     const response = await apiClient.get('/Orders/admin/view-all-customer-orders', {
//       params: {
//         pageNumber: paginationOptions.value.currentPage,
//         pageSize: paginationOptions.value.pageSize
//       }
//     });

//     paginationOptions.value.total = response.data.metadata.totalCount;
// const orders = response.data.orders.map(order => ({
//   image: order.image ? `${import.meta.env.VITE_APP_API_BASE_URL}${order.image}` : null,
//   name: order.name,
//   dateOrdered: order.dateOrdered,
//   formattedDateOrdered: order.formattedDateOrdered,
//   amount: order.amount,
//   orderId: order.orderId,
//   status: order.status,
// }));

//     displayedCustomers.value = orders;
//     localStorage.setItem('customerOrders', JSON.stringify(orders));
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// const displayCustomerOrders = (orders) => {
//   customers.value = orders;
// };

const fetchData = async () => {
  try {
    loadingInstance.value = ElLoading.service({ text: 'Loading...' });
    const response = await apiClient.get('/Orders/admin/view-all-customer-orders', {
      params: {
        pageNumber: paginationOptions.value.currentPage,
        pageSize: paginationOptions.value.pageSize
      }
    });

    paginationOptions.value.total = response.data.metadata.totalCount;
    const orders = response.data.orders.map(order => ({
      image: order.image ? `${import.meta.env.VITE_APP_API_BASE_URL}${order.image}` : null,
      name: order.name,
      dateOrdered: order.dateOrdered,
      formattedDateOrdered: order.formattedDateOrdered,
      amount: order.amount,
      orderId: order.orderId,
      status: order.status,
      whoReferredYou: order.whoReferredYou,
    }));
    customers.value = orders;
    displayedCustomers.value = orders;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loadingInstance.value.close();
  }
};


const fetchDetails = async (orderId: string) => {
  try {
    const response = await apiClient.get(`/Orders/admin/view-customer-order/${orderId}`);
    details.value = response.data;
  } catch (error) {
    console.error('Error fetching details:', error);
  }
};

const totalAmount = computed(() => {
  if (!details.value) return '₦0.00';

  const priceStripped = details.value.price.replace(/[^\d.-]/g, '');
  const modemAmountStripped = details.value.planModemAndInstallationAmount.replace(/[^\d.-]/g, '');

  const price = parseFloat(priceStripped);
  const modemAmount = parseFloat(modemAmountStripped);

  if (isNaN(price) || isNaN(modemAmount)) {
    console.error('Invalid price or modem amount:', details.value.price, details.value.planModemAndInstallationAmount);
    return '₦0.00';
  }

  const total = price + modemAmount;

  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });

  return formatter.format(total);
});

onMounted(() => {
  fetchData();
});

const searchInput = ref('');
const nameInput = ref('');
const statusInput = ref('');
const idInput = ref('');
const dateInput = ref('');


const filteredCustomers = computed(() => {
  let filteredList = customers.value;

  if (searchInput.value.trim() !== '') {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filteredList = filteredList.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm)
    );
  }

  if (nameInput.value.trim() !== '') {
    const nameTerm = nameInput.value.trim().toLowerCase();
    filteredList = filteredList.filter(customer =>
      customer.name.toLowerCase().includes(nameTerm)
    );
  }

  if (statusInput.value.trim() !== '') {
    const statusTerm = statusInput.value.trim().toLowerCase();
    filteredList = filteredList.filter(customer =>
      customer.status.toLowerCase().includes(statusTerm)
    );
  }

  if (idInput.value.trim() !== '') {
    const idTerm = idInput.value.trim().toLowerCase();
    filteredList = filteredList.filter(customer =>
      customer.orderId.toLowerCase().includes(idTerm)
    );
  }

  if (dateInput.value.trim() !== '') {
    const dateTerm = dateInput.value.trim().toLowerCase();
    filteredList = filteredList.filter(customer =>
      customer.dateOrdered.toLowerCase().includes(dateTerm)
    );
  }
  return filteredList;
});


const getStatusStyle = (status: string) => {
  const backgroundColor = status === 'Successful' ? '#008000' : '#DC3545';
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
};

let selectedUserId = null;
let selectedStatus = ref();

const showSidebar = ref(false);

const toggleSidebar = (orderId, status) => {
  selectedUserId = orderId;
  selectedStatus = status;
  showSidebar.value = !showSidebar.value;
};

const navigateSOF = (action) => {
  if (action === 'generate' && selectedUserId !== null) {
    console.log(selectedUserId);
    router.push({ name: 'CustomerDetails', params: { orderId: selectedUserId.toString() } });
  } else {
  }
};

const downloadForm = async (orderId: string) => {
  await fetchDetails(orderId);

  if (!details.value) {
    console.error('No details found for the given order ID');
    return;
  }

  const user = details.value;
  // const photograph = `https://devsalesportal.ipnxnigeria.net${user.photograph}`;
  // const identification = `https://devsalesportal.ipnxnigeria.net${user.governmentID}`;
  // const utilityBill = `https://devsalesportal.ipnxnigeria.net${user.utilityBill}`;
  const photograph = `${import.meta.env.VITE_APP_API_BASE_URL}${user.photograph}`;
  const identification = `${import.meta.env.VITE_APP_API_BASE_URL}${user.governmentID}`;
  const utilityBill = `${import.meta.env.VITE_APP_API_BASE_URL}${user.utilityBill}`;
  const structuredHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Service Order Form: ${user.name}</title>
          <style>
          .main{
            margin: 0vh 3vw;
            background-color:white;
          }
          .cform {
            max-width: 600px;
            margin: 0vh 3vw;
          }
          .row {
            margin-bottom: 20px; 
            color:#2C2762; /*dark blue*/
          }
          #bg{
            background-color: lightblue;
            text-align: center;
            display: inline-block;
            padding: 0vh 1vw;
            margin-right: 10px;
          }
          .row strong {
            display: inline-block;
            width: 200px; 
            margin-right: 40px;
            color:#6F9ED2;
          }
          #upload{
            text-decoration: underline;
            color: #2C2762;
            cursor: pointer;
          }
          </style>
        </head>
        <body>
        <div style="background-color: lightgray; ">
          <img src="/src/assets/ipNX_Logo.png" alt="" style="margin: 0vh 25vw">
          <div class="main">
            <div style="background-color:red; width:54.2vw; height:3vh"></div>
            <h1 style="text-align: center; color:black">Service Order Form: ${user.customerName}</h1>
            <hr style="width:45vw; margin: 3vh 5vw; transform: scaleY(0.1);">
            <div class="cform" style="color:black">
              <div class="row"><strong>Order Reference Number:  </strong>${user.orderReferenceNumber}</div>
              <div class="row"><strong>What type of internet plan are you looking for?:  </strong>${user.customerType}</div>
              <div class="row"><strong>Terms and Conditions:  </strong><div id="bg">${user.termsAndConditions}</div>
              <div class="row"><strong>Please choose an internet plan:  </strong><div id="bg">${user.planName}</div></div>
              <div class="row"><strong>Price:  </strong>${user.price}</div>
              <div class="row"><strong>Internet Plan + Modem & Installation:  </strong>${user.planModemAndInstallationAmount}</div>
              <div class="row"><strong>Number of Month(s):  </strong><div id="bg">${user.months}</div></div>
              <!-- <div class="row"><strong>Amount to Pay:  </strong>${user.price}</div> -->
              <div class="row"><strong>Please choose an internet plan:  </strong><div id="bg">${user.planTypeName}</div></div>
              <div class="row"><strong>Choose number of months:  </strong><div id="bg">${user.months}</div></div>
              <div class="row"><strong>Who referred you to ipNX?:  </strong><div id="bg">${user.whoReferredYou}</div></div>
              <div class="row"><strong>Sales Agent</strong><div id="bg">${user.salesAgentName}</div></div>
              <div class="row"><strong>Name:  </strong>${user.customerName}</div>
              <div class="row"><strong>Gender:  </strong>${user.gender}</div>
              <div class="row"><strong>Date of Birth:  </strong>${user.dateOfBirth}</div>
              <div class="row"><strong>Occupation:  </strong>${user.occupation}</div>
              <div class="row"><strong>E-mail:  </strong>${user.email}</div>
              <div class="row"><strong>Mobile Phone:  </strong>${user.phoneNumber}</div>
              <div class="row"><strong>Address:  </strong>${user.address}</div>
              <div class="row"><strong>Type of building:  </strong>${user.typeOfBuilding}</div>
              <div class="row"><strong>Billing Information:  </strong>${user.billingInformation}</div>
              <div class="row"><strong>Upload Passport Photograph:  </strong><a href="${photograph}" target="_blank" id="upload">View Photograph</a></div>
              <div class="row"><strong>Upload Personal Identification:  </strong><a href="${identification}" target="_blank" id="upload">View ID</a></div>
              <div class="row"><strong>Upload Utility Bill:  </strong><a href="${utilityBill}" target="_blank" id="upload">View Utility Bill</a></div> 
              <div class="row"><strong>Personal Data Processing Consent:  </strong><div id="bg">${user.personalDataConsent}</div></div>
              <div class="row" style="  margin-bottom: 5vh;"><strong>Data Privacy Policy:  </strong><div id="bg">${user.privacyPolicy}</div></div>
              <div><br><br></div>
            </div>
          </div>
        </div>
        </body>
      </html>
    `;
  html2pdf()
    .from(structuredHtml)
    .toPdf()
    .get('pdf')
    .then(function (pdf) {
      const fileName = `ServiceOrderForm_${user.customerName}.pdf`;
      pdf.save(fileName);
    });
}

const downloadReceipt = async (orderId: string) => {
  await fetchDetails(orderId);

  if (!details.value) {
    console.error('No details found for the given order ID');
    return;
  }

  const user = details.value;
  // const date = new Date().toISOString(); 
  console.log(user.orderDateAndTime)


  // const date = new Date().toISOString(); 
  console.log(user.orderDateAndTime)


  const structuredHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt: ${user.customerName}</title>
        <style>
        .main{
          margin: 0vh 3vw;
          background-color:white;
          color: balck;
        }
        .cform {
          max-width: 600px;
          margin: 4vh 3vw;
          margin: 4vh 3vw;
        }
        .row {
            display: flex;
            margin-bottom: 30px; 
            justify-content: space-between;
        }
        .right {
            text-align: right;
        }
        hr {
            height: 0.1px; 
            color: lightcoral;
            margin-bottom: 30px; 
        }
        </style>
      </head>
      <body>
      <div style="background-color: white; ">
        <img src="/src/assets/ipNX_Logo.png" alt="" style="margin: 0vh 45vw">
        <div class="main">
          <h1 style="text-align: center; color: black">RECEIPT</h1>
          <div class="cform" style="color:black">
            <div class="row">
                <strong>${user.orderDateAndTime}</strong>
                <span class="right">${user.email}</span>
            </div>
            <hr style= "color:#DC3545">
            <div class="row">
                <strong>Reference Number</strong>
                <span class="right">${user.paymentReferenceNumber}</span>
            </div>
            <hr>
            <div class="row">
                <strong>Plan Type</strong>
                <span class="right">${user.planTypeName}</span>
            </div>
            <hr>
            <div class="row">
                <strong>Price</strong>
                <span class="right">${user.price}</span>
            </div>
            <hr>
            <div class="row">
                <strong>Modem & Installation</strong>
                <span class="right">${user.planModemAndInstallationAmount}</span>
            </div>
            <hr>
            <div class="row" style="margin-bottom: 5vh;">
                <strong>Total</strong>
                <span class="right">${totalAmount.value}</span>
            </div>
            <div><br><br></div>
          </div>
        </div>
      </div>
      </body>
    </html>
  `;
  html2pdf()
    .from(structuredHtml)
    .toPdf()
    .get('pdf')
    .then(function (pdf) {
      const fileName = `Receipt_${user.customerName}.pdf`;
      pdf.save(fileName);
    });
};

const sendReceiptByEmail = async (orderId) => {
  await fetchDetails(orderId);

  if (!details.value) {
    console.error('No details found for the given order ID');
    return;
  }

  const user = details.value;

  const structuredHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt: ${user.customerName}</title>
        <style>
        .main{
          margin: 0vh 3vw;
          background-color:white;
          color: balck;
          color: balck;
        }
        .cform {
          max-width: 600px;
          margin: 4vh 3vw;
          margin: 4vh 3vw;
        }
        .row {
            display: flex;
            margin-bottom: 30px; 
            justify-content: space-between;
        }
        .right {
            text-align: right;
        }
        hr {
            height: 0.1px; 
            color: lightcoral;
            margin-bottom: 30px; 
        }
        </style>
      </head>
      <body>
      <div style="background-color: white; ">
        <img src="/src/assets/ipNX_Logo.png" alt="" style="margin: 0vh 45vw">
        <div class="main">
          <h1 style="text-align: center;">RECEIPT</h1>
          <div class="cform">
            <div class="row">
                <strong>${user.orderDateAndTime}</strong>
                <span class="right">${user.email}</span>
            </div>
            <hr style= "color:#DC3545">
            <div class="row">
                <strong>Reference Number</strong>
                <span class="right">${user.paymentReferenceNumber}</span>
            </div>
            <hr>
            <div class="row">
                <strong>Plan Type</strong>
                <span class="right">${user.planTypeName}</span>
            </div>
            <hr>
            <div class="row">
                <strong>Price</strong>
                <span class="right">${user.price}</span>
            </div>
            <hr>
            <div class="row">
                <strong>Modem & Installation</strong>
                <span class="right">${user.planModemAndInstallationAmount}</span>
            </div>
            <hr>
            <div class="row" style="margin-bottom: 5vh;">
                <strong>Total</strong>
                <span class="right">${totalAmount.value}</span>
            </div>
            <div><br><br></div>
          </div>
        </div>
      </div>
      </body>
    </html>
  `;

  const pdfBlob = await html2pdf().from(structuredHtml).toPdf().output('blob');

  const formData = new FormData();
  formData.append('Email', user.email);
  formData.append('PdfFile', pdfBlob, `Receipt_${user.customerName}.pdf`);

  try {
    loadingInstance.value = ElLoading.service({ text: 'Loading...' });
    await apiClient.post('/Mailing/send-pdf-receipt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RvcnQiOiJmYzY2MGJjZS1iOTMwLTRlZTMtYjkzYy1mZmVmOGRhNzdkM2YiLCJlbWFpbCI6InRpcmVuaWFsYWJpQGdtYWlsLmNvbSIsIm5iZiI6MTcxNzY2MjMyMCwiZXhwIjoxNzE3NzQ4NzIwLCJpYXQiOjE3MTc2NjIzMjAsImlzcyI6ImlwTlgiLCJhdWQiOiJldmVyeW9uZSJ9.AktuuriHaJoX7zHivgaTWI-EToFN030YqxBL2lDaBgQ', // Replace with your actual auth token
      },
    });
    console.log('Receipt sent successfully');
    ElMessage({
      type: 'success',
      message: `Receipt sent successfully!`
    });

  } catch (error) {
    console.error('Error sending receipt:', error);
    ElMessage.error('Error sending receipt');
  } finally {
    loadingInstance.value.close();
  }
};

const paginationOptions = ref({
  pageSize: 10,
  currentPage: 1,
  total: 0,
  pageSizes: [10, 20, 30, 50]
});

const displayedCustomers = ref([]);

// watchEffect(() => {
//   const startIndex = (paginationOptions.value.currentPage - 1) * paginationOptions.value.pageSize;
//   const endIndex = startIndex + paginationOptions.value.pageSize;
//   displayedCustomers.value = filteredCustomers.value.slice(startIndex, endIndex);
//   paginationOptions.value.total = filteredCustomers.value.length;
// });

const numberOfCustomers = computed(() => paginationOptions.value.total);

const sortOrder = ref<'asc' | 'desc'>('asc');

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// const sortCustomers = () => {
//   const sortedCustomers = [...filteredCustomers.value];
//   sortedCustomers.sort((a, b) => {
//     if (sortOrder.value === 'asc') {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   });
//   return sortedCustomers;
// };

const sortedCustomers = computed(() => {
  const sortedList = [...filteredCustomers.value];
  if (sortOrder.value === 'asc') {
    return sortedList.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return sortedList.sort((a, b) => b.name.localeCompare(a.name));
  }
});

// watchEffect(() => {
//   sortCustomers();
// });


const handleSizeChange = (pageSize) => {
  paginationOptions.value.pageSize = pageSize;
  fetchData();
};

const handleCurrentChange = (currentPage) => {
  paginationOptions.value.currentPage = currentPage;
  fetchData();
};
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

.el-footer p {
  font-size: 14px;
  line-height: 140%;
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

.input2 {
  height: 20px;
  width: 180px;
  border-radius: 20px;
  top: -2px;
}

.inputbox {
  height: 20px;
  width: 250px;
  border-radius: 20px;
  top: -2px;
  background-color: black;
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

  .input2 {
    width: 100px;
  }
}
</style>
