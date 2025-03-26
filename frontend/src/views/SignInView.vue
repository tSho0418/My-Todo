<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const userName = ref('');
  const password = ref('');

  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/sign-in');
    } catch (error) {
      console.error('API Error:', error);
    }
  });

  const verify = async() => {
    try{
      const response = await axios.post('http://localhost:8080/sign-in', {
        userName: userName.value,
        password: password.value
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };
</script>

<template>
    <div>
      <h1>サインイン</h1>
      <div>
        <input type="text" v-model="userName" placeholder="ユーザー名" />
        <input type="password" v-model="password" placeholder="パスワード" />
        <button @click="verify">サインイン</button>
        <router-link to="/sign-up">アカウントをお持ちでない方</router-link>
      </div>
    </div>
  </template>
  