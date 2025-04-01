<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
import { useRouter } from 'vue-router';

  const userName = ref('');
  const password = ref('');
  const router = useRouter();
  const errorMessages = ref('');
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/sign-in');
    } catch (error) {
      console.error('API Error:', error);
    }
  });

  const verify = async() => {
    try{
      if(!userName.value || !password.value){
        alert('すべてのフィールドを入力してください');
        return;
      }
      const response = await axios.post('http://localhost:8080/sign-in', {
        userName: userName.value,
        password: password.value
      },{
            withCredentials: true,
      });
      console.log(response);
      userName.value = '';
      password.value = '';
      if(response.status === 200){
        router.push('/todolist');
      }
    } catch (error) {
      errorMessages.value = error.response.data.message;
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
  