<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const counter = useCounterStore()
const templates = ref([])

const formData = ref({
    work_time: '',
    rest_time: '',
    name: '',
    number_of_intervals: '',
    user_id: 1  // Hardcoded for now
})


const submitTemplate = async () => {
    console.log(formData.value)
    const response = await axios.post('http://localhost:8080/templates', formData.value)
    console.log('Template created:', response.data)

    //Refresh templates list
    const templatesResponse = await axios.get('http://localhost:8080/templates/1')
    templates.value = templatesResponse.data

    // Clear form
    formData.value = {
      work_time: '',
      rest_time: '',
      name: '',
      number_of_intervals: '',
      user_id: 1
    }
}

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

      <div>
        <h2>Add new template:</h2>
        Work time: <input id="work_time" placeholder="Number of seconds...">
        <button @click="console.log('clicked')">Submit</button>
      </div>

      <div class="form-container">
        <h2>Add new template (new):</h2>
        <form @submit.prevent="submitTemplate">
            <div>
                <label>Name:</label>
                <input
                    v-model="formData.name"
                    paceholder="Template Name..."
                    required
                >
            </div>
            <div>
                <label>Work Time (seconds):</label>
                <input
                    v-model="formData.work_time"
                    type="number"
                    placeholder="Work time in seconds..."
                    required
                >
            </div>
            <div>
                <label>Rest Time (seconds):</label>
                <input 
                    v-model="formData.rest_time" 
                    type="number" 
                    placeholder="Rest time in seconds..."
                    required
                >
            </div>
            <div>
                <label>Number of intervals:</label>
                <input 
                    v-model="formData.number_of_intervals" 
                    type="number" 
                    placeholder="Number of intervals..."
                    required
                >
            </div>
            <button type="submit">Create Template</button>

        </form>
      </div>
    </main>
  </template>