<script setup lang="ts">
import { useTrainingStore } from '@/stores/trainingStore';
import CommentField from '@/components/CommentField.vue';


</script>

<template>
this is the submit workout view, asking for confirm and showing summary
<CommentField @stian="console.log" color="blue" placeholderText="hallo alex" />
<button @click="useTrainingStore().submitWorkout">Submit workout</button>


</template>