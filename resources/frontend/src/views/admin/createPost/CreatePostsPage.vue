<script setup lang="ts">
import BaseBtn from '@/components/BaseBtn.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import FormError from '@/components/FormError.vue'
import type { ICreatePostInput } from './types/createPost.types'
import { createPostHTTP } from './actions/createPost'
import { showError, successMsg } from '@/helper/Toastification'

const postInput = ref<ICreatePostInput>({
  title: '',
  post_content: ''
})

const rules = {
  title: { required },
  post_content: { required }
}

const v$ = useVuelidate(rules, postInput)

const loadingStatus = ref(false)
async function createPost() {
  const result = await v$.value.$validate()

  if (!result) return

  try {
    loadingStatus.value = true
    const data = await createPostHTTP(postInput.value)
    postInput.value = {} as ICreatePostInput
    successMsg(data.message)
    loadingStatus.value = false
    v$.value.$reset()
  } catch (error) {
    loadingStatus.value = false
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
          <form action="" @submit.prevent="createPost">
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
              <BaseBtn label="Create Post" :loading="loadingStatus" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-4"></div>
  </div>
</template>
