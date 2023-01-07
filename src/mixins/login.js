import axios from 'axios'
import router from '../router';

const base = '/vue-ec-website-mission'

function login(user) {
  const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
  axios.post(api, user).then((response) => {
    const { token, expired } = response.data;
    // 寫入 cookie token
    // expires 設置有效時間
    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
    router.push(`${base}/admin`)
  }).catch((err) => {
    alert(err.response.data.message)
  });
}

export default login
