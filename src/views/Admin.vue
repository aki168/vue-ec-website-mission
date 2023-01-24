<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import logout from '@/mixins/logout';
import checkAdmin from '@/mixins/checkAdmin';
import detailDialog from '@/components/detail-dialog.vue';
import confirmDelOneDialog from '@/components/confirm-del-one-dialog.vue';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'cryptalk';

const initVal = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  description: "",
  content: "",
  is_enabled: 1,
  imageUrl: "",
  // imagesUrl: []
}
const dataSource = ref({...initVal, imagesUrl: []})

// init & wrap
const products = ref([])
const loading = ref(false)
const getData = async () => {
  loading.value = true
  const url = `${apiUrl}/api/${apiPath}/admin/products`;
  await axios.get(url).then((res) => {
  let data = (res.data.products).map(item => item.imagesUrl? item : {...item, imagesUrl:[]})
    products.value = data
  })
    .catch(err => {
      alert(err.response.data.message)
    })
  loading.value = false
}
onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  checkAdmin()
  getData()
})

// Create
const mode = ref('addOne') // 'editOne'
const dialog = ref(false)

const addOne = async (item) => {
  let paramsObj = { data: item }
  const url = `${apiUrl}/api/${apiPath}/admin/product`;
  await axios.post(url, paramsObj).then((res) => {
    alert(res.data.message)
    dialog.value = false
    getData()
    dataSource.value = { ...initVal, imagesUrl: []}
  })
    .catch(err => {
      let msg = err.response?.data?.message;
      let resMsg = JSON.stringify(msg)
        .replace(/title 屬性/i, '產品標題')
        .replace(/category 屬性/i, '分類')
        .replace(/unit 屬性/i, '單位');
      alert(resMsg)
    })
}

// Delete
const delDialog = ref(false)

const editOne = async (item) => {
  let paramsObj = { data: item }
  const { id } = item
  const url = `${apiUrl}/api/${apiPath}/admin/product/${id}`
  await axios.put(url, paramsObj).then((res) => {
    alert(res.data.message)
    dialog.value = false
    getData()
    dataSource.value = { ...initVal, imagesUrl: []}
  })
    .catch(err => {
      let msg = err.response?.data?.message;
      let resMsg = JSON.stringify(msg)
        .replace(/title 屬性/i, '產品標題')
        .replace(/category 屬性/i, '分類')
        .replace(/unit 屬性/i, '單位');
      alert(resMsg)
    })
}

// Delete
const delOne = async (item) => {
  const url = `${apiUrl}/api/${apiPath}/admin/product/${item.id}`
  await axios.delete(url)
    .then((res) => {
      delDialog.value = false
      alert(res.data.message)
      getData()
      dataSource.value = { ...initVal, imagesUrl: []}
    })
    .catch(err => {
      alert(err.response?.data?.message)
    })
}
// watch()中第一個參數為觀察ref物件，第二個參數為一個callBack，
// 當狀態更新，就會針對其來執行callback。
</script>

<template>
  <div class="text-center container min-vh-100">
    <nav class="p-2 d-flex">
      <v-btn @click="logout">
        登出
      </v-btn>
    </nav>
    <v-btn class="my-2 d-block ms-auto" color="green lighten-2" dark @click="() => {
      dialog = true
      mode = 'addOne'
      dataSource = { ...initVal, imagesUrl: [] }
    }">
      建立新的商品
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            分類
          </th>
          <th class="text-center">
            產品名稱
          </th>
          <th class="text-center">
            原價
          </th>
          <th class="text-center">
            售價
          </th>
          <th class="text-center">
            是否啟用
          </th>
          <th class="text-center">
            編輯
          </th>
        </tr>
      </thead>
      <tbody v-if="loading === false">
        <tr v-for="item in products" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.origin_price }}</td>
          <td class="text-center">{{ item.price }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled === 1" class="text-green-700 font-bold">是</span>
            <span v-else class="text-red-200">否</span>
          </td>
          <td class="flex justify-center gap-2 py-1">
            <v-btn color="blue" @click="() => {
              dialog = true
              mode = 'editOne'
              dataSource = { ...item }
            }">
              編輯
            </v-btn>
            <v-btn color="red" @click="() => {
              delDialog = true
              dataSource = { ...item }
            }">
              刪除
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    
    <div v-if="loading === true" class="flex justify-center py-2">
      <v-progress-circular class="block" color="blue-lighten-3" indeterminate :size="68"
        :width="5"></v-progress-circular>
    </div>

    <detail-dialog :data-source='dataSource' :dialog='dialog' :mode='mode' 
    @close-dialog='() => {
      dialog = false
      dataSource = { ...initVal, imagesUrl: [] }
    }' 
      @submit='addOne' @send-edit='editOne' />

    <confirm-del-one-dialog :data-source='dataSource' :del-dialog='delDialog' 
    @close-del-dialog='() => {
      delDialog = false
      dataSource = { ...initVal, imagesUrl: [] }
    }' 
      @send-del-one='delOne' />
  </div>
</template>
