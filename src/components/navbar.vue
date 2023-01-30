<script setup>
import logout from '@/mixins/logout';
defineProps({
  isLogin:{
    type: Boolean,
    default: false
  },
  isAdmin:{
    type: Boolean,
  }
})
defineEmits(['loginSuccess','logout'])
</script>

<template>
  <nav class="p-2 d-flex bg-cyan-500 min-h-[60px]">
    <div class="container flex gap-2">
      <v-btn @click="logout" color="white" v-if="!!$props.isLogin">
        登出
      </v-btn>
      <v-btn color="white" v-if="!!$props.isAdmin">
        <router-link to="products">
          預覽商店
        </router-link>
      </v-btn>
      <v-btn color="white" v-else>
        <router-link to="admin">
          返回後台
        </router-link>
      </v-btn>
    </div>
  </nav>
</template>