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
  <div>
    <h1>Todoリスト</h1>
    <router-link to="/" @click.prevent="signOut">サインアウト</router-link>
  </div>
</template>