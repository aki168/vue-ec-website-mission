import { ref } from 'vue'
import axios from 'axios'

const useResource = (resource) => {

  const isLoading = ref(true)
  
  const products = ref([])
  const apis = 'admin/products'
  const baseURL = `https://vue3-course-api.hexschool.io/v2/api/cryptalk`

  const getData = async () => {
    isLoading.value = true
    await axios.get(`${baseURL}/${apis}`).then((res) => {
      let data = (res.data.products).map(item => item.imagesUrl ? item : { ...item, imagesUrl: [] })
      if (data) {
        products.value = data
      }
    })
      .catch(err => {
        alert(err.response.data.message)
      })
    isLoading.value = false
  }

  return {
    products,
    getData,
    isLoading
  }
}


export default useResource