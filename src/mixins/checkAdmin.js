import axios from 'axios';
import router from '../router';
const base = '/vue-ec-website-mission'

async function checkAdmin(loginSuccess) {
  const url = `https://vue3-course-api.hexschool.io/v2/api/user/check`;
  await axios.post(url).then((res) => {
    loginSuccess()
  })
    .catch(err => {
      alert('請重新登入')
      router.push(base)
    })
}

export default checkAdmin
