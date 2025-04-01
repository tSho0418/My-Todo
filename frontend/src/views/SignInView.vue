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
    <div class="container">
      <h1 class="sign-in">サインイン</h1>
      <div class="sign-in-form">
        <input type="text" v-model="userName" placeholder="ユーザー名" />
        <input type="password" v-model="password" placeholder="パスワード" />
        <button @click="verify">サインイン</button>
        <p id="error">{{ errorMessages }}</p>
        <router-link to="/sign-up">アカウントをお持ちでない方</router-link>
      </div>
    </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .sign-in {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: #333;
  }

  .sign-in-form {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  }

  .sign-in-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .sign-in-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .sign-in-form button:hover {
    background-color: #0056b3;
  }

  .sign-in-form a {
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;
  }

  .sign-in-form a:hover {
    text-decoration: underline;
  }

  #error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>
    