<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref<string>("Stian er tøff")

const props = defineProps<{
    stian?: string,
    color?: string,
    placeholderText?: string
}>()

const emit = defineEmits<{
    stian: [text: string]
}>()


const handleSubmit = () => {
    emit('stian', inputValue.value)
}

</script>

<template>


    <input
        type="text"
        :placeholder="placeholderText"
        v-bind:value="stian"
        @input="
            $emit('stian',($event.target as HTMLInputElement).value)
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