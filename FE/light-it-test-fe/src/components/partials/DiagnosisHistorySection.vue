<template>
    <div v-if="diagnosis" class="flex flex-row justify-left align-center">
        <div class="p-3 w-72">
            {{ diagnosis?.description }}
        </div>
        <div class="p-3 w-52">
            Accuracy: {{ diagnosis?.precision.toFixed(2) }}
        </div>
        <div class="p-3 w-52">
            {{ diagnosis?.confirmed ? 'Confirmed' : 'Not Confirmed' }}
        </div>
        <span v-if="isLoading">
            Waiting diagnosis confirmation...
        </span>
        <span v-else-if="error" class="text-red-500 w-52">
            {{ error }}
        </span>
        <button
            v-else-if="!diagnosis?.confirmed"
            class="block w-40 bg-green-600 text-white rounded p-3 text-sm"
            type="submit"
            @click="confirmDiagnosis"
        >
            CONFIRM
        </button>
    </div>
</template>

<script setup>
    import { defineProps, toRefs, ref } from 'vue'
    import { DiagnosisHistory } from '@/types/types';
    import axios from 'axios';

    let isLoading = ref(false)
    let error = ref(null)

    const props = defineProps({
        diagnosis: DiagnosisHistory
    })

    const { diagnosis } = toRefs(props)

    const confirmDiagnosis = async () => {
    try {
      isLoading.value = true;
      const diagnosisUuid = diagnosis?.value?.uuid;
      await axios.put(`api/diagnosis/confirm/${diagnosisUuid}`, {})
      isLoading.value = false;
      diagnosis.value.confirmed = true;
    } catch (err) {
      error.value = err?.response?.data;
      isLoading.value = false;
    }
  }
</script>

<style lang="scss">
</style>