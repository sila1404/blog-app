<script setup lang="ts">
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import { onMounted, ref } from 'vue'
import { type GetPostResponse, getPostHTTP } from './actions/getPostList'
import { myDebounce } from '@/helper/util'

const posts = ref<GetPostResponse>()
const query = ref<string>('')

async function showPost(page = 1, query = '') {
  const data = await getPostHTTP(page, query)
  posts.value = data
}

const searchPost = myDebounce(async () => {
  await showPost(1, query.value)
}, 300)

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
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Image</td>
            <td>Title</td>
            <td>Content</td>
            <td>Upload</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts?.data" :key="post?.id">
            <td>{{ post.id }}</td>
            <td>Image</td>
            <td>{{ post.title }}</td>
            <td>{{ post.post_content }}</td>
            <td>
              <button class="btn btn-primary">Upload</button>
            </td>
            <td>
              <button class="btn btn-outline-primary">Edit</button>
            </td>
            <td>
              <button class="btn btn-outline-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="posts">
        <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost" />
      </div>
    </div>
  </div>
</template>
