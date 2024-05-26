<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <div>
      <span>Name : Test User</span><br />
      <span>Email : <a href="">test@mail.com</a></span
      ><br />
      <span style="color: red; cursor: pointer"><b>Logout</b></span
      ><br />
    </div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #e3f2fd">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page" to="/admin">Dashboard</RouterLink>
            </li>
            <li class="nav-item" style="font-weight: bold">
              <RouterLink class="nav-link" to="/create-post">Create-post</RouterLink>
            </li>
            <li class="nav-item" style="font-weight: bold">
              <RouterLink class="nav-link" to="/post-lists">Post-lists</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br />
    <br />

    <div class="row">
      <RouterView />
    </div>
  </div>
</template>
