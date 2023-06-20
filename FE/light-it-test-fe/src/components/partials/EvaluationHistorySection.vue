<template>
    <div v-if="evaluation" class="my-7">
        <div class="flex flex-col">
            <h3 class="px-3 text-xl font-semibold">
                Evaluation
            </h3>
            <div class="flex flex-row">
                <div class="flex flex-col px-3">
                    <h4 class="">
                        Date:
                    </h4>
                    <h4 class="">
                        {{ new Date(evaluation?.date).toLocaleDateString('en-US') }}
                    </h4>
                </div>
                <div class="flex flex-col mx-3 w-full overflow-hidden whitespace-nowrap">
                    <h4 class="">
                        Symptoms:
                    </h4>
                    <span class="overflow-ellipsis">
                        {{ evaluation?.symptoms }}
                    </span>
                </div>
            </div>
            <div class="p-3">
                <h4 class="bg-gray-700 text-white">
                    Diagnoses:
                </h4>
                <div v-for="diagnosis in evaluation.diagnoses" :key="diagnosis" class="border border-gray w-full">
                    <DiagnosisHistorySection :diagnosis="diagnosis" :confirmed="diagnosis?.confirmed"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'
    import DiagnosisHistorySection from './DiagnosisHistorySection.vue'
    import { EvaluationHistory } from '@/types/types';

    const props = defineProps({
        evaluation: EvaluationHistory
    })

    const { evaluation } = toRefs(props)
</script>

<style lang="scss">
</style>