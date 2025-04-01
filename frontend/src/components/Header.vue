<script setup>

    import axios from 'axios';
    import router from '../router';


    const signOut = async() => {
        try{
            await axios.post('http://localhost:8080/sign-out');
            router.push('/');
        }catch(error){
            console.error('API Error:', error);
        }
        
    };
</script>

<template>
  <div class="header">
    <h1>Todoリスト</h1>
    <router-link to="/" @click.prevent="signOut">サインアウト</router-link>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  margin: 0;
  font-size: 40px;
  color: #333;
}

.header a {
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
}

.header a:hover {
  text-decoration: underline;
}
</style>