<template>
    <div>
        <h2 class="m-6 text-xl">Diagnoses</h2>
    </div>
    <div v-if="diagnoses && diagnoses.length > 0" class="border border-gray w-96">
        <div v-for="diagnosis in diagnoses" :key="diagnosis" class="border border-gray w-96">
            <DiagnosisSection :diagnosis="diagnosis"/>
        </div>
    </div>
    <span v-else-if="diagnoses?.length === 0" class="text-red-500">
        Not available diagnoses for that symptoms list.
    </span>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'
    import DiagnosisSection from './DiagnosisSection.vue'

    const props = defineProps({
        diagnoses: [],
    })

    const { diagnoses } = toRefs(props)
</script>

<style lang="scss">
</style>