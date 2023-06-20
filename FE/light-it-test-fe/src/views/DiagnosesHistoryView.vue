<template>
  <TopNav />
  <div id="Evaluation">
    <div class="w-full py-10 pb-10 pt-3 flex flex-col justify-center items-center">
      <div class="w-full text-center mb-9">
          <h1 class="m-6 text-4xl">History</h1>
      </div>
      <div v-if="!isLoading">
        <div class="mb-5">
          <div class="w-full">
            <DiagnosesHistorySection :history="history"/>
          </div>
        </div>
      </div>
      <div v-else>
        Loading diagnoses history...
      </div>
      <span v-if="error" class="text-red-500">
          {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import TopNav from '../components/structure/TopNav.vue'
  import DiagnosesHistorySection from '../components/partials/DiagnosesHistorySection.vue'
  import axios from 'axios';
  import { ref, onMounted } from 'vue';

  let error = ref(null)
  let history = ref([])
  let isLoading = ref(true)

  onMounted(async () => {
    try {
      const response = await axios.get('api/diagnosis/history');
      history.value = response.data;
      isLoading.value = false;
    } catch (err) {
      error.value = err?.response?.data;
      isLoading.value = false;
    }
  });

</script>