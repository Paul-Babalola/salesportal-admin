<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="15vw" style="height: 100vh;">
        <SideBarVue />
      </el-aside>

      <el-container>
        <el-header>
          <div class="box">
            <h4>Customer's Details</h4>

          </div>
        </el-header>

        <el-main style="height: 80vh; width: 85vw;">
          <!-- <div>ssssssssssssssss {{ customer.orderId }}</div> -->
          <div class="cform">
            <template v-if="customer">
              <h1 style="text-align: center; font-weight: 700; color: #0A1551;">ipNX Retail Service Order Form</h1>
              <hr style="width:70vw; margin: 0vh 5vw; transform: scaleY(0.1);">
              <div style="margin: 0vh 5vw;">
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Order Reference Number</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.orderReferenceNumber">
                      {{ customer.orderReferenceNumber }}
                    </template>
                    <template v-else>
                      No ReferenceNumber
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">What type of internet plan are you looking for?</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.customerType">
                      {{ customer.customerType }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Terms and Conditions</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.termsAndConditions">
                      {{ customer.termsAndConditions }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Please choose an internet plan</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.planName">
                      {{ customer.planName }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Price</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.price">
                      {{ customer.price }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Internet Plan + Modem & Installation</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.planModemAndInstallationAmount">
                      {{ customer.planModemAndInstallationAmount }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Number of Month(s)</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.months">
                      {{ customer.months }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Amount to Pay</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.price">
                      {{ customer.price }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Please choose an internet plan</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.planTypeName">
                      {{ customer.planTypeName }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Choose number of months</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.months">
                      {{ customer.months }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Who referred you to ipNX</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.whoReferredYou">
                      {{ customer.whoReferredYou }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Sales Agent</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.salesAgentName">
                      {{ customer.salesAgentName }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Name</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.customerName">
                      {{ customer.customerName }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Gender</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.gender">
                      {{ customer.gender }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Date of Birth</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer">
                      {{ formatDate(customer.dateOfBirth) }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Occupation</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.occupation">
                      {{ customer.occupation }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">E-mail</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.email">
                      {{ customer.email }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Mobile Phone</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.phoneNumber">
                      {{ customer.phoneNumber }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Address</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.address">
                      {{ customer.address }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Type of building</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.typeOfBuilding">
                      {{ customer.typeOfBuilding }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Billing Information</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.billingInformation">
                      {{ customer.billingInformation }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Upload Passport Photograph</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.photograph">
                      <a :href="customerPhotograph" target="_blank" id="upload">View Photograph</a>
                    </template>
                    <template v-else>
                      No Image
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Upload Personal Identification</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.governmentID">
                      <a :href="customerID" target="_blank" id="upload">View Personal ID</a>
                    </template>
                    <template v-else>
                      No ID
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Upload Utility Bill</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.utilityBill">
                      <a :href="customerUtility" target="_blank" id="upload">View Utility Bill</a>
                    </template>
                    <template v-else>
                      No Utility Bill
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Personal Data Processing Consent</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.personalDataConsent">
                      {{ customer.personalDataConsent }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7" id="leftside">Data Privacy Policy</el-col>
                  <el-col :span="7" id="rightside">
                    <template v-if="customer.privacyPolicy">
                      {{ customer.privacyPolicy }}
                    </template>
                    <template v-else>
                      Nil
                    </template>
                  </el-col>
                </el-row>
              </div>
              <button class="download" @click="downloadForm">Download SOF</button>
            </template>
            <template v-else>
              <div>Loading</div>
            </template>
          </div>
        </el-main>

        <el-footer style="height: 4vh;">
          <p>© 2022, ipNX Nigeria Limited.</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElIcon, ElHeader, ElInput, ElRow, ElCol, buildLocaleContext, ElLoading } from 'element-plus'
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/axios.js';
import SideBarVue from '@/components/SideBar.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import html2pdf from 'html2pdf.js';


const router = useRouter();

name: 'CustomerDetails'

interface Customer {
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
const customer = ref<Customer[]>([]);
const loadingInstance = ref(null)

const formatDate = (value: string | undefined) => {
  if (!value) return 'Nil';
  const date = new Date(value);
  return date.toLocaleDateString(); 
 };

const fetchData = async (orderId: string) => {
  try {
    loadingInstance.value = ElLoading.service({ text: 'Loading...' });
    const response = await apiClient.get(`/Orders/admin/view-customer-order/${orderId}`);
    customer.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
      loadingInstance.value.close();
     }
};
onMounted(() => {
  const route = useRoute();
  const orderId = route.params.orderId as string;

  if (orderId) {
    fetchData(orderId);
  } else {
    console.error('Order ID is not provided in the route parameters.');
  }
});


const customerID = computed(() => {
  if (customer.value.governmentID) {
    return `${import.meta.env.VITE_APP_API_BASE_URL}${customer.value.governmentID}`;
  } else {
    return 'No ID';
  }
});
const customerPhotograph = computed(() => {
  if (customer.value.photograph) {
    return `${import.meta.env.VITE_APP_API_BASE_URL}${customer.value.photograph}`;
  } else {
    return 'No Photograph';
  }
});
const customerUtility = computed(() => {
  if (customer.value.utilityBill) {
    return `${import.meta.env.VITE_APP_API_BASE_URL}${customer.value.utilityBill}`;
  } else {
    return 'No Bill';
  }
});

const downloadForm = () => {
  if (!customer.value) {
    console.error('Customer data is not available');
    return;
  }
  const photograph = `${import.meta.env.VITE_APP_API_BASE_URL}${customer.value.photograph}`;
  const identification = `${import.meta.env.VITE_APP_API_BASE_URL}${customer.value.governmentID}`;
  const utilityBill = `${import.meta.env.VITE_APP_API_BASE_URL}${customer.value.utilityBill}`;

  const structuredHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Service Order Form: ${customer.value.name}</title>
        
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
            <h1 style="text-align: center; color: black">Service Order Form: ${customer.value.customerName}</h1>
            <hr style="width:45vw; margin: 3vh 5vw; transform: scaleY(0.1);">
            <div class="cform" style="color:black">
              <div class="row"><strong>Order Reference Number:  </strong>${customer.value.orderReferenceNumber}</div>
              <div class="row"><strong>What type of internet plan are you looking for?:  </strong>${customer.value.customerType}</div>
              <div class="row"><strong>Terms and Conditions:  </strong><div id="bg">${customer.value.termsAndConditions}</div>
              <div class="row"><strong>Please choose an internet plan:  </strong><div id="bg">${customer.value.planName}</div></div>
              <div class="row"><strong>Price:  </strong>${customer.value.price}</div>
              <div class="row"><strong>Internet Plan + Modem & Installation:  </strong>${customer.value.planModemAndInstallationAmount}</div>
              <div class="row"><strong>Number of Month(s):  </strong><div id="bg">${customer.value.months}</div></div>
              <!-- <div class="row"><strong>Amount to Pay:  </strong>${customer.value.price}</div> -->
              <div class="row"><strong>Please choose an internet plan:  </strong><div id="bg">${customer.value.planTypeName}</div></div>
              <div class="row"><strong>Choose number of months:  </strong><div id="bg">${customer.value.months}</div></div>
              <div class="row"><strong>Who referred you to ipNX?:  </strong><div id="bg">${customer.value.whoReferredYou}</div></div>
              <div class="row"><strong>Sales Agent</strong><div id="bg">${customer.value.salesAgentName}</div></div>
              <div class="row"><strong>Name:  </strong>${customer.value.customerName}</div>
              <div class="row"><strong>Gender:  </strong>${customer.value.gender}</div>
              <div class="row"><strong>Date of Birth:  </strong>${customer.value.dateOfBirth}</div>
              <div class="row"><strong>Occupation:  </strong>${customer.value.occupation}</div>
              <div class="row"><strong>E-mail:  </strong>${customer.value.email}</div>
              <div class="row"><strong>Mobile Phone:  </strong>${customer.value.phoneNumber}</div>
              <div class="row"><strong>Address:  </strong>${customer.value.address}</div>
              <div class="row"><strong>Type of building:  </strong>${customer.value.typeOfBuilding}</div>
              <div class="row"><strong>Billing Information:  </strong>${customer.value.billingInformation}</div>
              <div class="row"><strong>Upload Passport Photograph:  </strong><a href="${photograph}" target="_blank" id="upload">View Photograph</a></div>
              <div class="row"><strong>Upload Personal Identification:  </strong><a href="${identification}" target="_blank" id="upload">View ID</a></div>
              <div class="row"><strong>Upload Utility Bill:  </strong><a href="${utilityBill}" target="_blank" id="upload">View Utility Bill</a></div> 
              <div class="row"><strong>Personal Data Processing Consent:  </strong><div id="bg">${customer.value.personalDataConsent}</div></div>
              <div class="row" style="  margin-bottom: 5vh;"><strong>Data Privacy Policy:  </strong><div id="bg">${customer.value.privacyPolicy}</div></div>
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
      const fileName = `ServiceOrderForm_${customer.value.customerName}.pdf`;
      pdf.save(fileName);
    });
}



</script>


<style scoped>
.common-layout {
  font-family: 'Roboto', sans-serif;
}


.el-header {
  width: 100vw;
  height: 6vh;
  padding: 0px;
  background-color: white;
  margin-right: 0px;
  color: black;
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
  font-weight: 400;
  font-style: normal;
  margin-top: 5px;
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
  margin-top: -20px;
  padding: -30px 0px 0px 0px;
  margin-inline: 82vw;
}

.cform {
  width: auto;
  height: 77vh;
  font-family: "IBM Plex Sans", sans-serif;
  overflow-y: auto;
}

.el-row {
  margin-bottom: -2vh;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  margin: 1vw 10vh;
  text-align: center;
}

#rightside {
  color: #2C2762;
  font-weight: 600;
  font-size: 16px;
  text-align: justify;
}

#leftside {
  color: #6F9ED2;
  font-weight: 600;
  font-size: 14px;
  text-align: justify;
}

#upload {
  text-decoration: underline;
  color: #2C2762;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}

.download {
  background: #DA1919;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 64px;
  color: #FFFFFF;
  width: 14vw;
  height: 7vh;
  float: right;
  margin: 0vh 12vw;
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

  .el-main {
    margin: 0vh -8vw;
  }

  .download {
    width: 20vw;
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

  .el-main {
    margin: 0vh -8vw;
  }

  .download {
    width: 50vw;
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
  }

  .el-table {
    width: 20vw;
  }

  #leftside,
  #rightside {
    text-align: left;
  }

}
</style>
