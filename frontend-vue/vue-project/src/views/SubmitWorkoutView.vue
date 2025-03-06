<script setup lang="ts">
import { useTrainingStore } from '@/stores/trainingStore';
import CommentField from '@/components/CommentField.vue';
import { useIntervalStore } from '@/stores/interval';
import { parseTime } from '@/utils/formatters';

const trainingStore = useTrainingStore()
const trainingData = trainingStore.trainingData

const intervalStore = useIntervalStore()

</script>

<template>
this is the submit workout view, asking for confirm and showing summary
<p>Total intervals completed: {{ trainingData.length }}</p>
<p>Total work time: {{ parseTime(intervalStore.workTime * trainingData.length) }}</p>
<CommentField color="blue" placeholderText="hallo alex" />
<button @click="useTrainingStore().submitWorkout">Submit workout</button>


</template>