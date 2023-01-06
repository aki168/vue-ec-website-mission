<script setup>
import { ref } from 'vue'
const dialog = ref(false)
const delDialog = ref(false)
</script>


<template>
  <div class="text-center container vh-100">

    <v-btn class="my-2 d-block ms-auto" color="green lighten-2" dark v-bind="attrs" v-on="on" @click="dialog = true">
      建立新的商品
    </v-btn>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td class="text-end"></td>
          <td class="text-end"></td>
          <td>
            <span class="text-success">啟用</span>
            <span>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <v-btn color="blue">
                編輯
              </v-btn>
              <v-btn color="red" @click="delDialog = !delDialog.value">
                刪除
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>



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
      <template v-slot:activator="{ on, attrs }">
      </template>

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
                <v-text-field label="標題" placeholder="請輸入標題" />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <v-text-field label="分類" placeholder="請輸入分類" />
                </div>
                <div class="mb-3 col-md-6">
                  <v-text-field label="單位" placeholder="請輸入單位" />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <v-text-field label="原價" placeholder="請輸入原價" />
                </div>
                <div class="mb-3 col-md-6">
                  <v-text-field label="圖片售價" placeholder="請輸入售價" />
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <v-textarea label="產品描述" placeholder="請輸入產品描述" />
              </div>
              <div class="mb-3">
                <v-textarea label="說明內容" placeholder="請輸入說明內容" />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <v-checkbox label="是否啟用" color="success" value="success" hide-details :true-value="1" :false-value="0"/>
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
          <v-btn color="green" @click="dialog = false">
            確認
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>




<style scoped>

</style>