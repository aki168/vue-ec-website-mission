<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'addOne' // 'editOne'
  },
  dataSource: {
    type: Object,
    default: {
      title: "",
      category: "",
      origin_price: 0,
      price: 0,
      unit: "",
      description: "",
      content: "",
      is_enabled: 1,
      imageUrl: "",
      imagesUrl: []
    }
  },
  dialog: {
    type: Boolean
  },
  closeOnBack: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close-dialog', 'submit', 'sendEdit'])

const item = ref({})
const isEdit = computed(() => props.mode === 'editOne')
const newOneImgPath = ref('')
const borderImgId = ref(null)

watch(() => props.dialog, () => {
  item.value = props.dataSource
})
</script>

<template>
  <v-dialog v-model="props.dialog" width="800" :close-on-back="props.closeOnBack">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ isEdit? '編輯產品': '新增產品' }}
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <v-text-field v-model="item.imageUrl" label="主要圖片網址" placeholder="請輸入主圖連結" />
                <div class="d-flex gap-2 mb-2">
                </div>
              </div>
              <img :src="item.imageUrl?.length > 5 ? item.imageUrl : 'https://fakeimg.pl/350x200/?text=preview'"
                :alt="item.imageUrl" />
            </div>
            <v-text-field v-model="newOneImgPath" label="圖片網址" placeholder="請輸入圖片連結" />
            <div class="d-flex gap-2 mb-2">
              <v-btn color="green" small @click="() => {
                item.imagesUrl.push(newOneImgPath)
                newOneImgPath = ''
                borderImgId = null
              }">
                新增圖片
              </v-btn>
              <v-btn v-if="item.imagesUrl" color="red" small @click="() => {
                item.imagesUrl.splice(borderImgId, 1)
                newOneImgPath = ''
                borderImgId = null
              }">
                刪除圖片
              </v-btn>
            </div>
            <div v-for="(image, index) in item.imagesUrl"
              :class="{ delOneImg: borderImgId !== null && Number(borderImgId) === index }"
              @click="borderImgId = index">
              <img class="img-fluid mb-1" :src="image" :id="index" :alt="image">
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <v-text-field v-model="item.title" label="產品標題(必填)" placeholder="請輸入標題" :rules="[v => !!v || '必填']" />
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <v-text-field v-model="item.category" label="分類(必填)" placeholder="請輸入分類" />
              </div>
              <div class="mb-3 col-md-6">
                <v-text-field v-model="item.unit" label="單位(必填)" placeholder="請輸入單位" />
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <v-text-field type="number" v-model.number="item.origin_price" min=0 label="原價" placeholder="請輸入原價" />
              </div>
              <div class="mb-3 col-md-6">
                <v-text-field type="number" v-model.number="item.price" min=0  label="售價" placeholder="請輸入售價" />
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <v-textarea v-model="item.description" label="產品描述" placeholder="請輸入產品描述" variant="underlined" />
            </div>
            <div class="mb-3">
              <v-textarea v-model="item.content" label="說明內容" placeholder="請輸入說明內容" variant="underlined" />
            </div>
            <div class="mb-3">
              <div class="form-check">
                <v-checkbox v-model="item.is_enabled" label="是否啟用" color="success" value="success" hide-details
                  :true-value="1" :false-value="0" />
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="$emit('close-dialog')">
          取消
        </v-btn>
        <v-btn v-if='!isEdit' color="green" @click="$emit('submit', item)">
          送出新增
        </v-btn>
        <v-btn v-if='isEdit' color="green" @click="$emit('send-edit', item)">
          送出修改
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>