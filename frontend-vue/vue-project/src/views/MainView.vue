<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const counter = useCounterStore()
const templates = ref([])

onMounted(async () => {
    const response = await axios.get('http://localhost:8080/templates/1')
    templates.value = response.data
    console.log('Data fetched: ', templates.value)
})



</script>

<template>
    <main>
      hallo
      <h1>Counter: {{ counter.count }}</h1>
      <h2>Double: {{ counter.doubleCount }}</h2>
      <button @click="counter.increment">Increment</button>

      <div>
        <h2>Templates from API:</h2>
        <pre>{{ templates }}</pre>
      </div>
    </main>
  </template>