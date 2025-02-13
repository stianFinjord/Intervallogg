<!-- IntervalTimer.vue -->
<template>
    <div class="interval-timer">
      <!-- Progress bar -->
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      </div>
  
      <!-- Interval info -->
      <div class="interval-header">
        <h2>Interval {{ currentInterval }}/{{ totalIntervals }}</h2>
        <div class="time-remaining">
          <h3>Work time remaining:</h3>
          <div class="timer">{{ formatTime(timeRemaining) }}</div>
        </div>
      </div>
  
      <!-- Interval details -->
      <div class="interval-details">
        <div>Work: {{ formatTime(workDuration) }}</div>
        <div>Rest: {{ formatTime(restDuration) }}</div>
      </div>
  
      <!-- Workout parameters -->
      <div class="workout-params">
        <div class="param-box">
          <label>Incline:</label>
          <div>{{ incline }}%</div>
        </div>
        <div class="param-box">
          <label>Pace:</label>
          <div>{{ pace }}km/h</div>
        </div>
      </div>
  
      <!-- Metrics -->
      <div class="metrics">
        <div class="metric-box">Pulse</div>
        <div class="metric-box">RPE</div>
      </div>
  
      <!-- Controls -->
      <div class="controls">
        <button @click="prevInterval" :disabled="currentInterval === 1">Prev</button>
        <button @click="togglePause">
          <span v-if="isPaused">▶</span>
          <span v-else>❚❚</span>
        </button>
        <button @click="nextInterval" :disabled="currentInterval === totalIntervals">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // Props
  const props = defineProps({
    totalIntervals: {
      type: Number,
      default: 5
    },
    workDuration: {
      type: Number,
      default: 105 // 1:45 in seconds
    },
    restDuration: {
      type: Number,
      default: 30
    },
    incline: {
      type: Number,
      default: 5
    },
    pace: {
      type: Number,
      default: 10.5
    }
  })
  
  // State
  const currentInterval = ref(2)
  const timeRemaining = ref(props.workDuration)
  const isPaused = ref(false)
  let timer = null
  
  // Computed
  const progressPercentage = computed(() => {
    return ((props.workDuration - timeRemaining.value) / props.workDuration) * 100
  })
  
  // Methods
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  const togglePause = () => {
    isPaused.value = !isPaused.value
    if (isPaused.value) {
      clearInterval(timer)
    } else {
      startTimer()
    }
  }
  
  const startTimer = () => {
    timer = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        clearInterval(timer)
        // Handle interval completion
      }
    }, 1000)
  }
  
  const prevInterval = () => {
    if (currentInterval.value > 1) {
      currentInterval.value--
      timeRemaining.value = props.workDuration
    }
  }
  
  const nextInterval = () => {
    if (currentInterval.value < props.totalIntervals) {
      currentInterval.value++
      timeRemaining.value = props.workDuration
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    startTimer()
  })
  
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })
  </script>
  
  <style scoped>
  .interval-timer {
    max-width: 300px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .progress-container {
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0.1s linear;
  }
  
  .interval-header {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .interval-details {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    color: #666;
  }
  
  .workout-params {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  
  .param-box {
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: center;
    min-width: 80px;
  }
  
  .metrics {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .metric-box {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: center;
  }
  
  .controls {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  button {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    cursor: pointer;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .timer {
    font-size: 1.5rem;
    font-weight: bold;
  }
  </style>