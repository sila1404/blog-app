<script setup lang="ts">
import { closeModal, openModal } from '@/helper/util'
import UploadImageModal from './components/UploadImageModal.vue'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import { onMounted, ref } from 'vue'
import { type GetPostResponse, getPostHTTP } from './actions/getPostList'
import { myDebounce } from '@/helper/util'
import { confirmDelete } from '@/helper/SweetAlert'
import { deletePostHTTP } from './actions/deletePost'
import { successMsg } from '@/helper/Toastification'
import PostTable from './components/PostTable.vue'
import type { IEditPostDataInput } from './types/postlists.types'
import { postStore } from '@/stores/admin/postStore'
import { useRouter } from 'vue-router'

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
const currentPostId = ref<number>(0)
async function showModal(postId: number) {
  openModal('postModal', postId).then((postId) => {
    currentPostId.value = postId
  })
}

const router = useRouter()

function editPostData(postData: IEditPostDataInput) {
  postStore.editPostData.id = postData.id
  postStore.editPostData.title = postData.title
  postStore.editPostData.post_content = postData.post_content

  postStore.editPost = true

  router.push("/create-post")
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
      <UploadImageModal
        @refreshTable="showPost"
        :postId="currentPostId"
        @closeModal="closeModal('postModal')"
      />

      <PostTable
        :posts="posts"
        @editPost="editPostData"
        @deletePost="deletePost"
        @showModal="showModal"
      />

      <div v-if="posts">
        <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost" />
      </div>
    </div>
  </div>
</template>
