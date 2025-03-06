<script setup lang="ts">
import { useTrainingStore } from '@/stores/trainingStore'

const props = defineProps<{
    stian?: string,
    color?: string,
    placeholderText?: string
}>()

/* const emit = defineEmits<{
    stian: [text: string]
}>() */

const trainingStore = useTrainingStore();
/* const handleSubmit = () => {
    emit('stian', inputValue.value)
} */

/* function handleSubmit(comment: string) {
    trainingStore.workoutComment = comment
} */

</script>

<template>


    <input
        type="text"
        :placeholder="placeholderText"
        v-bind:value="stian"
        @input="
            trainingStore.workoutComment=($event.target as HTMLInputElement).value
        "
    >
    <p>{{ color }}</p>
</template>

<style scoped>

input {
    background-color: v-bind(color);
    color: red;
    min-height: 50px;
}
</style>