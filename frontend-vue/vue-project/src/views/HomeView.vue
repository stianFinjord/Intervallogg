<script setup lang="ts">
import router from '@/router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Template {
  template_id: number,
  user_id: number,
  name: String,
  number_of_intervals: number,
  work_time: number,
  rest_time: number
}

const templates = ref<Template[]>([])

onMounted(async () => {
    const response = await axios.get('http://localhost:8080/templates/1')
    templates.value = response.data
    console.log('Data fetched: ', templates.value)
})
</script>

<template>
  <main>
    Here are my templates
    <div 
      v-for="template in templates" 
      class="template"
      @click="router.push({
        name:'startWorkout',
        query: {
          worktime: template.work_time,
          resttime: template.rest_time,
          intervals: template.number_of_intervals
        }
      })"
    >
      <h2>{{ template.name }}</h2>
      <p>Work time: {{ template.work_time }}s</p>
      <p>Rest time: {{ template.rest_time }}s</p>
      <p>Intervals: {{ template.number_of_intervals }}</p>
    </div>
    <button @click="router.push('newTemplate')">Make new template</button>
  </main>
</template>

<style>

.template{
  background-color: brown;
  gap: 2px;
  margin: 4px;
}
</style>