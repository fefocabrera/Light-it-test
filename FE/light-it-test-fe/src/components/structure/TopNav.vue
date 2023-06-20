<template>
  <div class="flex flex-row w-screen justify-between bg-gray-300 px-5 py-2">
    <nav class="bg-gray-300 flex flex-col items-left justify-between ">
      <div class="menu-toggle mt-1" @click="toggleMenu">
        <span class="block h-0.5 w-4 bg-gray-500 mb-1"></span>
        <span class="block h-0.5 w-4 bg-gray-500 mb-1"></span>
        <span class="block h-0.5 w-4 bg-gray-500 mb-1"></span>
      </div>
    </nav>
    <ul class="bg-gray-300 inline-block fixed top-8 left-0" :class="{ 'hidden': !isMenuOpen }">
      <li><router-link to="/evaluation" class="block my-3 mx-5">Evaluation</router-link></li>
      <li><router-link to="/diagnosesHistory" class="block my-3 mx-5">History</router-link></li>
    </ul>
    <div>
      <button
          class=""
          @click="logout"
      >
          Logout
      </button>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const isMenuOpen = ref(false);
    const token = sessionStorage.getItem('token');

    if(!token){
      router.push('/login')
    } else {
      axios.defaults.headers.common['Authorization'] = token
    }

    const logout = async () => {
      router.push('/login');
      sessionStorage.removeItem('token');
    }

    const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    };
</script>