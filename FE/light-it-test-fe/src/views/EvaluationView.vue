<template>
  <TopNav />
  <div id="Evaluation">
    <div class="w-full py-10 pb-10 pt-3 flex flex-col justify-center items-center">
      <div class="w-full text-center mb-9">
          <h1 class="m-6 text-4xl">Evaluation</h1>
      </div>
      <div class="mb-5" v-if="availableSymptoms?.length > 0">
        <div class="w-96">
          <MultiSelectDropdownInput 
            label="Symptoms"
            :options="availableSymptoms"
            v-model:input="selectedSymptoms"
          />
        </div>
      </div>
      <div v-else>
        Loading available symptoms...
      </div>
      <span v-if="error" class="text-red-500">
          {{ error }}
      </span>
      <button
          class="block w-96 bg-gray-800 text-white rounded-sm py-3 text-sm"
          type="submit"
          @click="evaluateSymptoms"
          :disabled="disabled"
      >
          Evaluate
      </button>
      <DiagnosesSection :diagnoses="diagnoses"/>
      <span v-if="isLoading && selectedSymptoms?.length > 0">
        Loading available evaluation...
      </span>
    </div>
  </div>
</template>

<script setup>
  import TopNav from '../components/structure/TopNav.vue'
  import axios from 'axios';
  import { ref, watch, onMounted } from 'vue';
  import MultiSelectDropdownInput from '../components/global/MultiSelectDropdownInput.vue'
  import DiagnosesSection from '../components/partials/DiagnosesSection.vue'

  let error = ref(null)
  let availableSymptoms = ref([])
  let selectedSymptoms = ref([])
  let isLoading = ref(true)
  let disabled = ref(true)
  let diagnoses = ref(null)

  const checkFields = () => {
    disabled.value =
        isLoading.value ||
        (!selectedSymptoms.value || selectedSymptoms.value.length === 0)
    };

  watch([selectedSymptoms], checkFields, { immediate: true });

  onMounted(async () => {
    try {
      const response = await axios.get('api/symptom');
      availableSymptoms.value = response.data;
      isLoading.value = false;
    } catch (err) {
      error.value = err?.response?.data;
      isLoading.value = false;
    }
  });

  const evaluateSymptoms = async () => {
    try {
      isLoading.value = true;
      diagnoses.value = null;
      const res = await axios.post('api/symptom/evaluate', {
          symptoms: selectedSymptoms.value
      })
      diagnoses.value = res.data;
      isLoading.value = false;
    } catch (err) {
      error.value = err?.response?.data;
    }
  }

</script>