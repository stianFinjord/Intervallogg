<script setup lang="ts">
const model = defineModel<number>({ default: 0 })

</script>

<template>
    <div class="rpe-slider">
        <div class="label-container">
            <span class="label">Light</span>
            <p>RPE: {{ model/2 }}</p>
            <span class="label">Max</span>
        </div>
        <input
            type="range"
            min="2"
            max="20"
            v-model="model"
        >

    </div>

</template>

<style>
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