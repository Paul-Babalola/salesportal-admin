<template>
  <div class="cont">
    <h5 style="font-weight: 700; padding: 10px 0px 0px 20px;">{{ title }}</h5>
    <el-table :data="tables" v-loading="loading">
      <el-table-column prop="name" label="Name" width="570px" class-name="name-column"></el-table-column>
      <el-table-column prop="total" label="Total" width="150px" :formatter="formatPrice"></el-table-column>
      <el-table-column prop="quantity" label="Quantity"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import apiClient from '@/axios.js';

interface SaleEntry {
  name: string;
  total: number;
  quantity: number;
}

const props = defineProps({
  title: {
    type: String,
    default: 'Top Sales',
  },
  salesData: {
    type: Array as () => SaleEntry[],
    default: () => [],
  },
  useLocalStorage: {
    type: Boolean,
    default: true,
  },
});

const tables = ref<SaleEntry[]>([]);
const loading = ref(false);

const formatPrice = (row, column, cellValue) => {
  if (typeof cellValue !== 'number') return cellValue;
  return cellValue.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).replace('NGN', '₦').trim();
};

const fetchDataFromAPI = async () => {
  loading.value = true;
  try {
    const response = await apiClient.get('/AdminDashBoardStats/top-sales');
    const apiData = response.data.map((user: any) => ({
      name: user.userName,
      total: user.totalOrderValue,
      quantity: user.orderCount,
    }));
    tables.value = apiData;
    if (props.useLocalStorage) {
      localStorage.setItem('topSales', JSON.stringify(apiData));
    }
  } catch (error) {
    console.error('Error fetching top sales:', error);
    tables.value = [];
  } finally {
    loading.value = false;
  }
};

const loadTopSales = () => {
  if (props.salesData.length) {
    tables.value = props.salesData;
  } else if (props.useLocalStorage && localStorage.getItem('topSales')) {
    try {
      tables.value = JSON.parse(localStorage.getItem('topSales') || '[]');
    } catch {
      fetchDataFromAPI();
    }
  } else {
    fetchDataFromAPI();
  }
};

onMounted(() => {
  loadTopSales();
});

watch(
  () => props.salesData,
  (newVal) => {
    if (newVal.length) {
      tables.value = newVal;
    }
  }
);
</script>

<style>
.el-table .el-table__header th {
  font-size: 10px;
}

.cont {
  margin-left: 0px;
}
</style>