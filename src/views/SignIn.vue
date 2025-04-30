<template>
  <div class="page-container">
    <div class="form-container">
      <!-- Use ElLoading component to show loading message -->
      <el-loading :fullscreen="true" :text="'Signing in...'" :visible="loading">
        <el-form :model="form" @submit.prevent="onSubmit" class="form">
          <el-form-item label="Username" class="uname2">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" class="uname2">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" class="sbtn2">Login</el-button>
          </el-form-item>
        </el-form>
      </el-loading>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import router from '../router';
import { ElMessage, ElLoading } from 'element-plus';
import apiClient from '@/axios.js'; // Import the configured ApiClient instance
import axios from 'axios';
import { cab } from "@/store/storage";

export default {
  name: 'SignIn',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeIndex = ref('1');

    const form = reactive({
      username: '',
      password: '',
    });

    const loading = ref(false);

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    const onSubmit = async () => {
      console.log('submit!');
      const loadingInstance = ElLoading.service({
        lock: true,
        text: 'Logging In...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      loading.value = true;

      try {
        // Call the sign function for authentication
        const responseCode = await sign(form.username, form.password);

        loading.value = false;
        loadingInstance.close();

        if (responseCode === 'F00') {

          console.log('Login successful, navigating to Dashboard');

          getToken().then((res) => {

            const redirectPath = route.query.redirect || { name: 'Dashboard' };
            router.push(redirectPath);
          });

        } else {
          ElMessage({
            type: 'error',
            message: 'Invalid credentials',
          });
          router.go(0);
        }
      } catch (error) {
        loading.value = false;
        loadingInstance.close();
        console.error('Error during sign-in:', error);
        ElMessage.error('An unexpected error occurred. Please try again later.');
      }
    };

    async function sign(username: string, password: string) {
  console.log(`Mock sign in with ${username}/${password}`);
  if (username === 'demo' && password === 'demo123') {
    localStorage.setItem("user_email", "demo@example.com");
    localStorage.setItem("user_name", "Demo User");
    return "F00";
  } else {
    return "F01";
  }
};

async function getToken() {
  console.log("Generating dummy token...");
  localStorage.setItem("jwt_token", "dummy-jwt-token-12345");
  return "F00";
};

   
    return {
      activeIndex,
      form,
      loading,
      handleSelect,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  padding: 0;
  margin: 0;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.el-form {
  width: 100%;
}

.uname2 {
  width: 100%;
}

.sbtn2 {
  width: 100%;
  background-color: blue;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
