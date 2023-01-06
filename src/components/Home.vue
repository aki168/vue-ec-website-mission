<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios'
import router from '../router';

const base = '/-vue-w2'

const user = {
  username: '',
  password: ''
}

function login() {
  const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
  axios.post(api, user).then((response) => {
    const { token, expired } = response.data;
    // 寫入 cookie token
    // expires 設置有效時間
    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
    router.push(`${base}/products`)
  }).catch((err) => {
    alert(err.response.data.message)
  });
}


</script>


<template>
  <div class="container my-3">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal text-center">
        請先登入
      </h1>
      <div class="col-8">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required autofocus 
              :value="user.username" @change="user.username = $event.target.value"
              >
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required
              :value="user.password" @change="user.password = $event.target.value"
              >
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">
      &copy; 2023~∞ - Hex School
    </p>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>