<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const userName = ref('');
    const password = ref('');
    const password2 = ref('');

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
        }
      } catch (error) {
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
  <div>
    <h1>サインアップ</h1>
    <div>
      <input type="text" v-model="userName" placeholder="ユーザー名" required/>
      <input type="password" v-model="password" placeholder="パスワード" required/>
      <input type="password" v-model="password2" placeholder="パスワード（確認）" required />
      <button @click="register">サインアップ</button>
      <router-link to="/sign-in">アカウントをお持ちの方</router-link>
    </div>
  </div>
</template>