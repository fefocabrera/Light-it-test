<template>
  <nav class="bg-gray-100 py-2 px-5 flex flex-col items-left justify-between ">
    <div class="menu-toggle" @click="toggleMenu">
      <span class="block h-0.5 w-4 bg-gray-500 mb-1"></span>
      <span class="block h-0.5 w-4 bg-gray-500 mb-1"></span>
      <span class="block h-0.5 w-4 bg-gray-500 mb-1"></span>
    </div>
  </nav>
  <ul class="bg-gray-100 inline-block fixed top-7 left-0" :class="{ 'hidden': !isMenuOpen }">
      <li><router-link to="/evaluation" class="block my-3 mx-5">Evaluation</router-link></li>
      <li><router-link to="/diagnosesHistory" class="block my-3 mx-5">History</router-link></li>
    </ul>
</template>

<script setup>
    import { ref } from 'vue';

    const isMenuOpen = ref(false);

    const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    };
</script>