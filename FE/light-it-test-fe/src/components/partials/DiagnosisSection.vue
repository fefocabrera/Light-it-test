<template>
    <div v-if="diagnosis" class="mb-7">
        <div>
            <h3 class="bg-gray-800 text-white px-3">
                Issue:
            </h3>
            <div>
                <h4 class="px-3">
                    {{ diagnosis.Issue.Name }}
                </h4>
                <span class="px-3">
                    Accuracy: {{ diagnosis.Issue.Accuracy.toFixed(2) }}%
                </span>
            </div>
        </div>
        <div>
            <h4 class="bg-gray-400 px-3 text-white">Specialists list:</h4>
                <div v-for="specialist in diagnosis.Specialisation" :key="specialist">
                    <span class="pl-5 pr-3">
                        -{{ specialist.Name }}
                    </span>
                </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'
    import Diagnosis from '../../types/types.ts'

    const props = defineProps({
        diagnosis: Diagnosis
    })

    const { diagnosis } = toRefs(props)
</script>

<style lang="scss">
</style>
export interface Diagnosis {
    Issue: {
        ID: number,
        Name: string,
        Accuracy: number,
        Ranking: number
    };
    Specialisation: {
        ID: number,
        Name: string
    };
}