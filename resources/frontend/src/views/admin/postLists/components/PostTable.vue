<script setup lang="ts">
import type { GetPostResponse } from '../actions/getPostList'

defineProps<{
  posts: GetPostResponse | undefined
}>()

const emit = defineEmits<{
  (e: 'deletePost', postId: number): void
  (e: 'showModal', postId: number): void
}>()
</script>
<template>
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
          <button class="btn btn-primary" @click="emit('showModal', post.id)">Upload</button>
        </td>
        <td>
          <button class="btn btn-outline-primary">Edit</button>
        </td>
        <td>
          <button class="btn btn-outline-danger" @click="emit('deletePost', post.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
