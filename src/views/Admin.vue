<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import logout from '@/mixins/logout';
import checkAdmin from '@/mixins/checkAdmin';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'cryptalk';

// data
let desserts = ref([])
const dialog = ref(false)
const delDialog = ref(false)
const editDialog = ref(false)
const confirmDelImgDialog = ref(false)
const loading = ref(false)
const loadingEdit = ref(false)

const pickOneImgPath = ref('')
const newOneImgPath = ref('')

const onEditProduct = ref({})

const addParams = reactive({
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  description: "",
  content: "",
  is_enabled: 1,
  imageUrl: "",
  imagesUrl: [
    "",
    "",
    "",
    "",
    ""
  ]
})

// methods

function pickOneImg(event) {
  let imgPath = event.target.alt
  pickOneImgPath.value = imgPath
}

function onAddOneImg() {
  let obj = { ...onEditProduct.value }
  let imgArr = obj?.imagesUrl && Array.isArray(obj?.imagesUrl) ? [...obj.imagesUrl, newOneImgPath.value] : []
  onEditProduct.value = { ...obj, imagesUrl: imgArr }
  addOneImg(onEditProduct.value.id)
}

function onDelOneImg() {
  let obj = { ...onEditProduct.value }
  let imagesUrl = [...obj.imagesUrl]
  let newImagesUrl = imagesUrl.filter(item => item !== pickOneImgPath.value)
  onEditProduct.value = { ...obj, imagesUrl: newImagesUrl }
  delOneImg(onEditProduct.value.id)
}

function onEdit(clickItem) {
  editDialog.value = true
  onEditProduct.value = { ...clickItem }
  // console.log({ ...onEditProduct.value })
}

function chengeOnAddImg(){
  onAddOneImg()
}

function chengeOnDelImg() {
  confirmDelImgDialog.value = true
}

async function delOneImg(id) {
  loadingEdit.value = true
  const url = `${apiUrl}/api/${apiPath}/admin/product/${id}`
  let paramsObj = { data: { ...onEditProduct.value } }
  await axios.put(url, paramsObj).then((res) => {
    confirmDelImgDialog.value = false
    setTimeout(() => {
      loadingEdit.value = false
    },1500)
  })
    .catch(err => {
      alert(err.response.data.message)
    })
}

async function addOneImg(id) {
  const url = `${apiUrl}/api/${apiPath}/admin/product/${id}`
  let paramsObj = { data: { ...onEditProduct.value } }
  await axios.put(url, paramsObj).then((res) => {
    alert(res.data.message)
    newOneImgPath.value=''
  })
    .catch(err => {
      alert(err.response.data.message)
    })
}

async function getData() {
  loading.value = true
  const url = `${apiUrl}/api/${apiPath}/admin/products`;
  await axios.get(url).then((res) => {
    desserts.value = res.data.products
  })
    .catch(err => {
      alert(err.response.data.message)
    })
  loading.value = false
}

async function submitEditSheet(){
  let temp = {...onEditProduct.value}
  let id = temp.id
  let paramsObj = { data: { ...onEditProduct.value } }
  const url = `${apiUrl}/api/${apiPath}/admin/product/${id}`
  await axios.put(url, paramsObj).then((res) => {
    alert(res.data.message)
    editDialog.value = false
    getData()
  })
    .catch(err => {
      alert(err.response.data.message)
    })
}

async function addOne() {
  // 將proxy物件target的值取出，再進行淺拷貝
  let paramsObj = { data: { ...addParams.value } }
  const url = `${apiUrl}/api/${apiPath}/admin/product`;
  await axios.post(url, paramsObj).then((res) => {
    alert(res.data.message)
  })
    .catch(err => {
      alert(err)
    })

}

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  checkAdmin()
  getData()
})
</script>

<template>
  <div class="text-center container vh-100">
    <nav class="p-2 d-flex">
      <v-btn @click="logout">
        登出
      </v-btn>
    </nav>
    <v-btn class="my-2 d-block ms-auto" color="green lighten-2" dark @click="dialog = true">
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
        <tr v-for="item in desserts" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.origin_price }}</td>
          <td class="text-center">{{ item.price }}</td>
          <td class="text-center">{{ item.is_enabled }}</td>
          <td class="flex justify-center gap-2 py-1">
            <v-btn color="blue" @click="onEdit(item)">
              編輯
            </v-btn>
            <v-btn color="red" @click="delDialog = !delDialog.value">
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

    <!-- dialog 刪除產品 -->
    <v-dialog v-model="delDialog" width="500">
      <v-card>
        <div class="bg-danger text-white">
          <v-card-title class="text-h5 grey lighten-2">
            <span>刪除產品</span>
          </v-card-title>
        </div>
        <v-card-text>
          是否刪除
          <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="delDialog = false">
            取消
          </v-btn>
          <v-btn color="red" @click="delDialog = false">
            確認刪除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- dialog 新增產品 -->
    <v-dialog v-model="dialog" width="800">
      <!-- <template v-slot:activator="{ on, attrs }">
      </template> -->
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          新增產品
        </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <v-text-field label="圖片網址" placeholder="請輸入圖片連結" />
                </div>
                <img class="img-fluid" src="" alt="">
              </div>
              <div class="d-flex gap-2">
                <v-btn color="green" small>
                  新增圖片
                </v-btn>
                <v-btn color="red" small>
                  刪除圖片
                </v-btn>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <v-text-field v-model="addParams.title" label="標題" placeholder="請輸入標題" />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <v-text-field v-model="addParams.category" label="分類" placeholder="請輸入分類" />
                </div>
                <div class="mb-3 col-md-6">
                  <v-text-field v-model="addParams.unit" label="單位" placeholder="請輸入單位" />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <v-text-field type="number" v-model.number="addParams.origin_price" label="原價" placeholder="請輸入原價" />
                </div>
                <div class="mb-3 col-md-6">
                  <v-text-field type="number" v-model.number="addParams.price" label="售價" placeholder="請輸入售價" />
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <v-textarea v-model="addParams.description" label="產品描述" placeholder="請輸入產品描述" />
              </div>
              <div class="mb-3">
                <v-textarea v-model="addParams.content" label="說明內容" placeholder="請輸入說明內容" />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <v-checkbox v-model="addParams.is_enabled" label="是否啟用" color="success" value="success" hide-details
                    :true-value="1" :false-value="0" />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="green" @click="addOne(addParams)">
            確認
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog 需修改之產品詳情 -->
    <v-dialog v-model="editDialog" width="800">
      <v-card>
        <div v-if="loadingEdit === true" class="flex justify-center py-2">
          <v-progress-circular class="block" color="blue-lighten-3" indeterminate :size="68"
            :width="5"></v-progress-circular>
        </div>
        <template v-if="loadingEdit === false">
          <v-card-title class="text-h5 grey lighten-2">
            修改產品
          </v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <v-text-field v-model="newOneImgPath" label="圖片網址" placeholder="請輸入圖片連結" />
                  </div>
                  <img :src="onEditProduct.imageUrl" :alt="onEditProduct.imageUrl" />
                </div>
                <div class="d-flex gap-2 mb-2">
                  <v-btn color="green" small @click="chengeOnAddImg">
                    新增圖片
                  </v-btn>
                  <v-btn color="red" small @click="chengeOnDelImg">
                    刪除圖片
                  </v-btn>
                </div>
                <img @click="pickOneImg" v-for="image in onEditProduct.imagesUrl" class="img-fluid mb-1"
                  :class="{ sepia: pickOneImgPath === image, shadow: pickOneImgPath === image }" :src="image"
                  :alt="image">
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <v-text-field v-model="onEditProduct.title" label="標題" placeholder="請輸入標題" />
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <v-text-field v-model="onEditProduct.category" label="分類" placeholder="請輸入分類" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <v-text-field v-model="onEditProduct.unit" label="單位" placeholder="請輸入單位" />
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <v-text-field type="number" v-model.number="onEditProduct.origin_price" label="原價"
                      placeholder="請輸入原價" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <v-text-field type="number" v-model.number="onEditProduct.price" label="售價" placeholder="請輸入售價" />
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <v-textarea v-model="onEditProduct.description" label="產品描述" placeholder="請輸入產品描述" variant="underlined"/>
                </div>
                <div class="mb-3">
                  <v-textarea v-model="onEditProduct.content" label="說明內容" placeholder="請輸入說明內容" variant="underlined"/>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <v-checkbox v-model="onEditProduct.is_enabled" label="是否啟用" color="success" value="success"
                      hide-details :true-value="1" :false-value="0" />
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="editDialog = false">
              取消
            </v-btn>
            <v-btn color="green" @click="submitEditSheet">
              確認
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>

    <!-- dialog 是否刪除產品單圖? -->
    <v-dialog v-model="confirmDelImgDialog" width="500">
      <v-card>
        <div class="bg-danger text-white">
          <v-card-title class="text-h5 grey lighten-2">
            <span>刪除產品圖片</span>
          </v-card-title>
        </div>
        <v-card-text>
          是否刪除
          <strong class="text-danger"></strong> 商品圖片(刪除後將無法恢復)。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmDelImgDialog = false">
            取消
          </v-btn>
          <v-btn color="red" @click="onDelOneImg">
            確認刪除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>




  </div>


</template>




<style scoped>

</style>
