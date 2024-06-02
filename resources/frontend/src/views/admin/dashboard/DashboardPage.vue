<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { countPostHTTP } from './actions/countPost';
import CountPost from './components/CountPost.vue';

const countPost = ref<number>(0)

onMounted(async () => {
  const data = await countPostHTTP()
  countPost.value = data
})
</script>
<template>
  <div class="row">
    <h1>Dashboard page</h1>
    <div class="row">
      <div class="col-md-4">
       <CountPost :countPost="countPost"/>
      </div>
    </div>
  </div>
</template>
