<script setup>
  const props = defineProps({
    dataSource:{
      type: Object
    },
    delDialog: {
      type: Boolean
    },
  })

  defineEmits(['close-del-dialog', 'send-del-one'])
</script>

<template>
  <v-dialog v-model="props.delDialog" width="500">
    <v-card>
      <div class="bg-danger text-white">
        <v-card-title class="text-h5 grey lighten-2">
          <span>刪除產品</span>
        </v-card-title>
      </div>
      <v-card-text>
        是否刪除
        <strong class="text-danger"></strong> {{ dataSource.title }}商品(刪除後將無法恢復)。
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close-del-dialog')">
          取消
        </v-btn>
        <v-btn color="red" @click="$emit('send-del-one', props.dataSource)">
          確認刪除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>