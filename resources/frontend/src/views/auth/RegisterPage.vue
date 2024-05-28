<script setup lang="ts">
import { ref } from 'vue'
import type { IRegisterInput } from './auth-type'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { RouterLink } from 'vue-router'
import FormError from '@/components/FormError.vue'
import { createUserHTTP } from './actions/RegisterUser'
import { showError, successMsg } from '@/helper/Toastification'
import BaseBtn from '@/components/BaseBtn.vue'

const registerInput = ref<IRegisterInput>({
  name: '',
  email: '',
  password: ''
})

const rules = {
  name: { required },
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, registerInput)

const loadingStatus = ref(false)
async function registerUser() {
  const result = await v$.value.$validate()

  if (!result) return

  try {
    loadingStatus.value = true
    const data = await createUserHTTP(registerInput.value)
    registerInput.value = {} as IRegisterInput
    successMsg(data.message)
    loadingStatus.value = false
    v$.value.$reset()
  } catch (error) {
    loadingStatus.value = false
    for (const message of error as string[]) {
      showError(message)
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Register Page</div>
        {{ registerInput }}
        <div class="card-body">
          <form action="" @submit.prevent="registerUser">
            <!-- start validate name input -->
            <FormError inputLabel="Name" :formErrors="v$.name.$errors">
              <input type="text" v-model="registerInput.name" class="form-control" />
            </FormError>
            <!-- start validate email input -->
            <FormError inputLabel="E-mail" :formErrors="v$.email.$errors">
              <input type="text" v-model="registerInput.email" class="form-control" />
            </FormError>
            <!-- start validate password input -->
            <FormError inputLabel="Password" :formErrors="v$.password.$errors">
              <input type="password" v-model="registerInput.password" class="form-control" />
            </FormError>
            <br />
            <RouterLink to="/">Login to account</RouterLink>
            <br />
            <div class="form-group">
              <BaseBtn label="Register" :loading="loadingStatus" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
