<script setup lang="ts">
import FormError from '@/components/FormError.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import type { ILoginInput } from './auth-type'

const loginInput = ref<ILoginInput>({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, loginInput)

function loginUser() {
  const result = v$.value.$validate()

  if (!result) return
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
              <button class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
