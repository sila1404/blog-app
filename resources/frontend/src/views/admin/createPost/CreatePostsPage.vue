<script setup lang="ts">
import BaseBtn from '@/components/BaseBtn.vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import FormError from '@/components/FormError.vue'
import type { ICreatePostInput } from './types/createPost.types'
import type { IUpdatePostInput } from './types/updatePost.types'
import { createPostHTTP } from './actions/createPost'
import { updatePostHTTP } from './actions/updatePost'
import { showError, successMsg } from '@/helper/Toastification'

import { postStore } from '@/stores/admin/postStore'

const router = useRouter()

const postInput = ref<ICreatePostInput | IUpdatePostInput>({
  id: postStore.editPostData.id,
  title: postStore.editPostData.title,
  post_content: postStore.editPostData.post_content
})

const rules = {
  title: { required },
  post_content: { required }
}

const v$ = useVuelidate(rules, postInput)

const loadingStatus = ref(false)
async function createOrUpdatePost() {
  const result = await v$.value.$validate()
  if (!result) return

  try {
    loadingStatus.value = true

    postStore.editPost ? await updatePost() : await createPost()

    v$.value.$reset()
  } catch (error) {
    loadingStatus.value = false
    showError((error as Error).message)
  }
}

async function createPost() {
  try {
    const data = await createPostHTTP(postInput.value)
    postInput.value = {} as ICreatePostInput
    successMsg(data.message)
    loadingStatus.value = false
  } catch (error) {
    showError((error as Error).message)
  }
}

async function updatePost() {
  try {
    const data = await updatePostHTTP(postInput.value as IUpdatePostInput)
    postStore.editPostData = {} as IUpdatePostInput
    postInput.value = {} as ICreatePostInput
    postStore.editPost = false
    router.push('/post-lists')

    successMsg(data.message)
  } catch (error) {
    showError((error as Error).message)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-2"></div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Create post Form</div>

        <div class="card-body">
          <form action="" @submit.prevent="createOrUpdatePost">
            <FormError inputLabel="Title" :formErrors="v$.title.$errors">
              <input type="text" v-model="postInput.title" class="form-control" />
            </FormError>

            <FormError inputLabel="Post-content" :formErrors="v$.post_content.$errors">
              <textarea
                type="text"
                rows="5"
                v-model="postInput.post_content"
                class="form-control"
              />
            </FormError>

            <br />

            <RouterLink to="/post-lists">See list of posts</RouterLink>

            <br />

            <div class="form-group">
              <BaseBtn
                :class="postStore.editPost ? 'btn-warning' : 'btn-primary'"
                :label="postStore.editPost ? 'Update Post' : 'Create Post'"
                :loading="loadingStatus"
              />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-4"></div>
  </div>
</template>
