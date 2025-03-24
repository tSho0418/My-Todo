<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const message = ref('');

  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/sign-in');
      message.value = response.data.message;
    } catch (error) {
      console.error('API Error:', error);
    }
  });
</script>

<template>
    <div>
      <h1>SignInページ</h1>
      <p>これは{{message}}です。</p>
      <router-link to="/">ホームページへ</router-link>
    </div>
  </template>
  