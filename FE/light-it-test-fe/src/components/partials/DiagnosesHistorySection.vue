<template>
    <div v-if="history && history.evaluations.length > 0" class="border border-gray w-screen">
        <div v-for="evaluation in history.evaluations" :key="evaluation" class="border border-gray w-screen">
            <EvaluationHistorySection :evaluation="evaluation"/>
        </div>
    </div>
    <span v-else class="text-red-500">
        Not available diagnoses for this user.
    </span>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'
    import EvaluationHistorySection from './EvaluationHistorySection.vue'
    import { DiagnosesHistory } from '@/types/types';

    const props = defineProps({
        history: DiagnosesHistory,
    })

    const { history } = toRefs(props)
</script>

<style lang="scss">
</style>