import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IEditPostDataInput } from '@/views/admin/postLists/types/postlists.types'

export const userPostStore = defineStore('post', () => {
  const editPostData = ref<IEditPostDataInput>({
    id: null,
    title: '',
    post_content: ''
  })
  const editPost = ref<boolean>(false)

  return { editPostData, editPost }
})

export const postStore = userPostStore()
