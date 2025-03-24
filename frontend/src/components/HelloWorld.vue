<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const message = ref('');

  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/');
      message.value = response.data.message;
    } catch (error) {
      console.error('API Error:', error);
    }
  });
</script>

<template>
  <div>
    <h1>Axios API 通信</h1>
    <p>{{ message }}</p>
  </div>
</template>

