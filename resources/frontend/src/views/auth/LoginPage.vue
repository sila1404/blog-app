<script setup lang="ts">
import FormError from '@/components/FormError.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import type { ILoginInput } from './auth-type'
import BaseBtn from '@/components/BaseBtn.vue'
import { loginUserHTTP } from './actions/LoginUser'
import { showError } from '@/helper/Toastification'

const loginInput = ref<ILoginInput>({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, loginInput)

const loadingStatus = ref(false)
async function loginUser() {
  const result = await v$.value.$validate()

  if (!result) return

  try {
    loadingStatus.value = false
    const data = await loginUserHTTP(loginInput.value)
    localStorage.setItem('userData', JSON.stringify(data))
    window.location.href = '/admin'
    loadingStatus.value = false
  } catch (error) {
    loadingStatus.value = false
    showError((error as Error).message)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Login Page</div>
        <div class="card-body">
          <form action="" @submit.prevent="loginUser">
            <FormError inputLabel="E-mail" :formErrors="v$.email.$errors">
              <input type="text" v-model="loginInput.email" class="form-control" />
            </FormError>

            <FormError inputLabel="Password" :formErrors="v$.password.$errors">
              <input type="password" v-model="loginInput.password" class="form-control" />
            </FormError>

            <br />
            <RouterLink to="/register">Create an account</RouterLink>
            <br />
            <div class="form-group">
              <div class="form-group">
                <BaseBtn label="Login" :loading="loadingStatus" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
