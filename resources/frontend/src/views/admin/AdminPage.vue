<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getUserData } from '@/helper/getUserData'
import { logoutUserHTTP } from './actions/logoutUser'
import { showError, successMsg } from '@/helper/Toastification'
import { onMounted } from 'vue'
import { userIsLoggedInHTTP } from './actions/userIsLoggedIn'

const userData = getUserData()

async function logoutUser() {
  const userId = userData?.user.id

  if (typeof userId !== 'undefined') {
    const data = await logoutUserHTTP(userId)
    successMsg(data.message)
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }
}

onMounted(async () => {
  try {
    await userIsLoggedInHTTP()
  } catch (error) {
    if ((error as Error).message === 'Unauthenticated.') {
      window.location.href = '/'
    }
  }
})
</script>

<template>
  <div class="container">
    <div>
      <span>Name : Test User</span><br />
      <span>Email : <a href="">test@mail.com</a></span
      ><br />
      <span style="color: red; cursor: pointer" @click="logoutUser"><b>Logout</b></span
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
