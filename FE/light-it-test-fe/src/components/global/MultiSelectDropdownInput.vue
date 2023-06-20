<template>
    <div class="flex flex-col item-center w-full">
        <label class="w-full block m-3 text-center">
            {{ label }}
        </label>
        <VueMultiselect 
            v-model="selectedOptions"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select symptoms"
            label="name"
            track-by="id"
        ></VueMultiselect>
    </div>
    <div class="h-5"></div>             
</template>

<script setup>
    import { defineProps, defineEmits, toRefs, computed } from 'vue'
    import VueMultiselect from 'vue-multiselect'

    const emit = defineEmits(['update:input'])

    const props = defineProps({
        label: String,
        input: null,
        options: {
            type: Array,
            default: () => []
        },
    })

    const { label, input, options } = toRefs(props)

    const selectedOptions = computed({
        get: () => input.value,
        set: (val) => emit('update:input', val)
    })
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>