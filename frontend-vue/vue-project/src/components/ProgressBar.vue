<script setup lang="ts">
import { ref } from 'vue'
const model = defineModel<number>({default: 40})

</script>

<template>

    <div class="bar-background"></div>
    <div class="bar-foreground" :style="{ width: model + 'vw' }"></div>

</template>

<style>
.bar-background {
    background-color: red;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 20px;
}

.bar-foreground {
    background-color: green;
    position: fixed;
    left: 0px;
    top: 0px;
    height: 20px;
}
</style>