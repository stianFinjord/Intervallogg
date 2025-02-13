<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const value = ref(11);

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    value.value = Number(target.value)
    emit('update:modelValue', value.value)
}






</script>

<template>
    <div class="rpe-slider">
        <div class="label-container">
            <span class="label">Light</span>
            <p>RPE: {{ value/2 }}</p>
            <span class="label">Max</span>
        </div>
        <input
            type="range"
            min="2"
            max="20"
            :value="value"
            @input="updateValue"
        >

    </div>
</template>

<style scoped>
.rpe-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
}

.rpe-slider input {
    width: 60vw;
}

.label-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60vw;
}

</style>