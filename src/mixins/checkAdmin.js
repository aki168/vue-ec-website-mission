import axios from 'axios';
import router from '../router';
const base = '/-vue-w2'

async function checkAdmin(fetchApi) {
  const url = `https://vue3-course-api.hexschool.io/v2/api/user/check`;
  await axios.post(url).then(() => {
    // fetchApi()
  })
    .catch(err => {
      alert('請重新登入')
      router.push(base)
    })
}

export default checkAdmin