<template>
    <div>
        <div class="flex item-center">
            <label class="w-2/5 block m-3 p-2">
                {{ label }}
            </label>
            <input 
                :placeholder="placeholder"
                class="block w-4/5 bg-white border border-gray-400 rounded p-2" 
                :type="inputType"
                v-model="inputComputed"
            >
        </div>
        <div v-if="((inputType === 'text' || inputType === 'password') && input && input.length < minLength)" class="h-5 p-2">
            <span class="text-red-500">{{ label }} must be longer than {{ minLength }} characters.</span>
        </div>
        <div v-else class="h-5"></div>
    </div>
                    
</template>

<script setup>
    import { defineProps, defineEmits, toRefs, computed } from 'vue'

    const emit = defineEmits(['update:input'])

    const props = defineProps({
        label: String,
        input: String,
        placeholder: { type: String, default: '' },
        inputType: String,
        minLength: { type: Number, default: 3 },
    })

    const { label, input, placeholder, inputType, minLength } = toRefs(props)

    const inputComputed = computed({
        get: () => input.value,
        set: (val) => emit('update:input', val)
    })
</script>