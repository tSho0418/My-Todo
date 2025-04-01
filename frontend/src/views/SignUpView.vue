<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const userName = ref('');
    const password = ref('');
    const password2 = ref('');
    const router = useRouter();

    const errorMessages = ref('');
    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:8080/sign-up');
      } catch (error) {
        console.error('API Error:', error);
      }
    });

    const register = async() => {
      try{
        if (!userName.value || !password.value || !password2.value) {
            alert('すべてのフィールドを入力してください');
            return;
        }
        if(confirmPassword() === true){
            const response = await axios.post('http://localhost:8080/sign-up', {
            userName: userName.value,
            password: password.value
            });
            userName.value = '';
            password.value = '';
            password2.value = '';
            router.push('/sign-in');
        }
        
      } catch (error) {
        errorMessages.value = error.response.data.message;
        console.error('API Error:', error);
      }
    };

    const confirmPassword = () => {
      if (password.value === password2.value) {
        return true;
      }else{
        alert('パスワードが一致しません');
        return false;
      }
    };
</script>

<template>
  <div class="container">
    <h1 class="sign-up">サインアップ</h1>
    <div class="sign-up-form">
      <p id="error">{{ errorMessages }}</p>
      <input type="text" v-model="userName" placeholder="ユーザー名" required/>
      <input type="password" v-model="password" placeholder="パスワード" required/>
      <input type="password" v-model="password2" placeholder="パスワード（確認）" required />
      <button @click="register">新規登録</button>
      <router-link to="/sign-in">アカウントをお持ちの方</router-link>
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

  .sign-up {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: #333;
  }

  .sign-up-form {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  }

  .sign-up-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .sign-up-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .sign-up-form button:hover {
    background-color: #0056b3;
  }

  .sign-up-form a {
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;
  }

  .sign-up-form a:hover {
    text-decoration: underline;
  }

  #error {
    color: red;
    text-align: center;
    margin-bottom: 15px;
  }
  </style>