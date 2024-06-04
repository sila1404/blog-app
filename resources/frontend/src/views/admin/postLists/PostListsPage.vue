<script setup lang="ts">
import { openModal } from '@/helper/util'
import UploadImageModal from './components/UploadImageModal.vue'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import { onMounted, ref } from 'vue'
import { type GetPostResponse, getPostHTTP } from './actions/getPostList'
import { myDebounce } from '@/helper/util'
import { confirmDelete } from '@/helper/SweetAlert'
import { deletePostHTTP } from './actions/deletePost'
import { successMsg } from '@/helper/Toastification'
import PostTable from './components/PostTable.vue'

const posts = ref<GetPostResponse>()
const query = ref<string>('')

async function showPost(page = 1, query = '') {
  const data = await getPostHTTP(page, query)
  posts.value = data
}

const searchPost = myDebounce(async () => {
  await showPost(1, query.value)
}, 300)

async function deletePost(postID: number) {
  confirmDelete()
    .then(async () => {
      console.log('Post Delete')
      const data = await deletePostHTTP(postID)
      await showPost()
      successMsg(data.message)
    })
    .catch((error) => console.log(error))
}



function showModal(postId: number) {
  openModal('postModal')
}

onMounted(async () => {
  await showPost()
})
</script>
<template>
  <div class="row">
    <div class="col-md-4">
      <input
        type="text"
        placeholder="search..."
        @keydown="searchPost"
        v-model="query"
        class="form-control"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-md-8">
      <UploadImageModal />

      <PostTable :posts="posts" @deletePost="deletePost" @showModal="showModal" />

      <div v-if="posts">
        <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost" />
      </div>
    </div>
  </div>
</template>