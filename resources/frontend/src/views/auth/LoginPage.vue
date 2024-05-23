<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Login Page</div>
        <div class="card-body">
          <form action="">
            <div class="form-group">
              <label for="">Email</label>
              <input type="text" name="" id="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="text" name="" id="" class="form-control" />
            </div>
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
