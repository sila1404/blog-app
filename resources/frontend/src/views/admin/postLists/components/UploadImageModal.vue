<script setup lang="ts">
import { App } from '@/shared/App'
import { getSelectImage, uploadImageHeader } from '@/helper/uploadImage'
import { ref } from 'vue'
import { showError, successMsg } from '@/helper/Toastification'

const props = defineProps<{
  postId: number
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
  (e: 'refreshTable'): void
}>()

const image = ref<any>()
function selectImage(e: any) {
  const selectedImage = getSelectImage(e, 'outputImage')
  image.value = selectedImage
}

async function uploadImage() {
  try {
    if (image.value !== '') {
      const reqOptions = uploadImageHeader(image.value, props.postId)
      const res = await fetch(`${App.apiURL}/posts/upload-image`, reqOptions)
      const data = await res.json()

      successMsg(data.message)
      image.value = ''
      const outputImage = document.getElementById('outputImage') as HTMLImageElement
      outputImage.src = ''
      emit('refreshTable')
    } else {
      showError('Please select an image')
    }
  } catch (error) {
    showError((error as Error).message)
  }
}
</script>
<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="postModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form enctype="multipart/form-data" @submit.prevent="uploadImage">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title - {{ postId }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="emit('closeModal')"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <img style="height: 150px" src="" id="outputImage" />
              <br />
              <label for="">Image</label>
              <br />
              <input type="file" required @change="selectImage" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="emit('closeModal')"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Upload</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
