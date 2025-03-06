<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router';
import { useIntervalStore } from '@/stores/interval';
import { ref, onMounted } from 'vue';

const intervalStore = useIntervalStore()
const route = useRoute()

const settings = ref({
    numberOfIntervals: intervalStore.totalIntervals,
    workTime: intervalStore.workTime,
    restTime: intervalStore.restTime,
})

onMounted(() => {
    settings.value.numberOfIntervals = Number(route.query.intervals) || 5
    settings.value.workTime = Number(route.query.worktime) || 30
    settings.value.restTime = Number(route.query.resttime) || 15
}) 

function beginWorkout() {
    intervalStore.initializeWorkout(
        settings.value.numberOfIntervals,
        settings.value.workTime,
        settings.value.restTime
    )
    router.push('interval')
}
</script>

<template>
  <main>
    These will be your settings<br>
    Number of intervals:<input v-model="settings.numberOfIntervals"><br>
    Work time:<input v-model="settings.workTime"><br>
    Rest time:<input v-model="settings.restTime"><br>
    <button @click="beginWorkout()">Start workout</button>
  </main>
</template>
