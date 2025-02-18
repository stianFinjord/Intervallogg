<script setup lang="ts">
import { useTrainingStore } from '@/stores/trainingStore';


</script>

<template>
this is the submit workout view, asking for confirm and showing summary

<button @click="useTrainingStore().submitWorkout">Submit workout</button>


</template>