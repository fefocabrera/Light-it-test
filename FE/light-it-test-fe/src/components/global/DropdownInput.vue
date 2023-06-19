<template>
    <div class="flex item-center">
        <label class="w-2/5 block m-3 p-2">
            {{ label }}
        </label>
        <select v-model="selectedOption" class="block w-4/5 bg-white border border-gray-400 rounded p-2">
            <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
        </select>
    </div>
    <div class="h-5"></div>             
</template>

<script setup>
    import { defineProps, defineEmits, toRefs, computed } from 'vue'

    const emit = defineEmits(['update:input'])

    const props = defineProps({
        label: String,
        input: String,
        options: {
            type: Array,
            default: () => [],
            validator: (value) =>
            value.every((option) => 'value' in option && 'label' in option)
        },
    })

    const { label, input, options } = toRefs(props)

    const selectedOption = computed({
        get: () => input.value,
        set: (val) => emit('update:input', val)
    })
</script>