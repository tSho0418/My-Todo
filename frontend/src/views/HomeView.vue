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
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  font-size: 2.0rem;
  text-align: center;
  margin-top: 20px;
}


p {
  color: #34495e;
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0;
}

a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
}

a:hover {
  background-color: #2980b9;
}
</style>


<template>
    <div class="home">
      <h1>My Todoリスト</h1>
      <p>やるべきことを可視化</p>
      <router-link class="sign-in" to="/sign-in">サインイン</router-link>
    </div>
  </template>