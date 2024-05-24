<script setup lang="ts">
import { ref } from 'vue'
import type { IRegisterInput } from './auth-type'
import { RouterLink } from 'vue-router'

const registerInput = ref<IRegisterInput>({
  name: '',
  email: '',
  password: ''
})
</script>

<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Register Page</div>
        {{ registerInput }}
        <div class="card-body">
          <form action="">
            <div class="form-group">
              <label for="">Name</label>
              <input type="text" v-model="registerInput.name" name="" id="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="">Email</label>
              <input type="text" v-model="registerInput.email" name="" id="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input
                type="text"
                v-model="registerInput.password"
                name=""
                id=""
                class="form-control"
              />
            </div>
            <br />
            <RouterLink to="/">Login to account</RouterLink>
            <br />
            <div class="form-group">
              <button class="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
