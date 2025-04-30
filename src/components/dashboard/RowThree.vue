<template>
  <div class="cont">
    <h5 style="font-weight: 700; padding: 10px 0px 0px 20px;">Top Sales</h5>
    <el-table :data="tables">
      <!-- <el-table-column label="Name" width="60px">
        <template #default="{ row }">
          <img :src="row.picture" alt="Product Image" style="width: 20px; height:20px;">
        </template>
</el-table-column> -->
      <el-table-column prop="name" label="Name" width="570px" class-name="name-column"></el-table-column>
      <!-- <el-table-column prop="price" label="Price" width="100px"></el-table-column> -->
      <el-table-column prop="total" label="Total" width="150px" :formatter="formatPrice"></el-table-column>
      <el-table-column prop="quantity" label="Quantity"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import apiClient from '@/axios.js';

interface Table {
  name: string;
  total: string;
  quantity: string;
}

const tables = ref<Table[]>([]);

const fetchData = async () => {
  try {
    let users: Table[] = [];

    let cachedData = localStorage.getItem('topSales');
    if (cachedData) {
      const data = JSON.parse(cachedData) as Table[];
      displayTopSales(data);
    }

    const response = await apiClient.get('/AdminDashBoardStats/top-sales');
    users = response.data.map((user: any) => ({
      name: user.userName,
      total: user.totalOrderValue,
      quantity: user.orderCount,
    }));

    displayTopSales(users);

    localStorage.setItem('topSales', JSON.stringify(users));

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const formatPrice = (row, column, cellValue) => {
  if (typeof cellValue !== 'number') {
    return cellValue;
  }
  return cellValue.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }).replace('NGN', '₦').trim();
};

const displayTopSales = (users: Table[]) => {
  tables.value = users;
};

onMounted(() => {
  fetchData();
});


</script>

<style>
.el-table .el-table__header th {
  font-size: 10px;
}

.cont {
  margin-left: 0px;
}
</style>