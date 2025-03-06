import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useTrainingStore } from '@/stores/trainingStore';

export const useIntervalStore = defineStore('interval', () => {
    const isPaused = ref(true)
    const isWorkMode = ref(true)
    const currentInterval = ref(1)
    const totalIntervals = ref(7)
    const workTime = ref(0) // Does this need to be a ref?
    const restTime = ref(0)
    const timeRemaining = ref(0)
    const timerId = ref(0)
    const incline = ref(5)
    const speed = ref(12500)

    const currentRPE = ref(11)

    const router = useRouter()
    const trainingStore = useTrainingStore()

    function togglePause() {
        isPaused.value = !isPaused.value;

        if(isPaused.value) {
            pauseTimer()
        } else {
            startTimer()
        }
    }

    function toggleWorkMode() {
        isWorkMode.value = !isWorkMode.value;
    }

    function startTimer() {
        timerId.value = setInterval(() => {
            if(timeRemaining.value > 0) {
                timeRemaining.value--
            } else {
                if(!isWorkMode.value) {
                    nextInterval()
                }
                toggleWorkMode()
                restartTimer()
            }
        }, 1000)
    }

    function restartTimer() {
        if(isWorkMode.value) {
            timeRemaining.value = workTime.value
        } else {
            timeRemaining.value = restTime.value
        }
    }

    function pauseTimer() {
        clearInterval(timerId.value)
    }

    function updateValues() {
        currentRPE.value = trainingStore.trainingData[currentInterval.value].rpe
    }



    function nextInterval() {
        if(currentInterval.value < totalIntervals.value) {
            currentInterval.value++
            updateValues()
        } else {
            router.push('submit')
        }
    }
    
    function prevInterval() { //TODO: Make check if user wants to exit if value is 1
        if (currentInterval.value > 1) {
            currentInterval.value--
            updateValues()
        } else {
            if(confirm("Are you sure you want to cancel the workout?")) {
                pauseTimer()
                router.push('startWorkout')
            }
        }
    }
    function initializeWorkout(numberOfIntervals: number, work_time: number, rest_time: number) {
        totalIntervals.value = numberOfIntervals
        workTime.value = work_time
        restTime.value = rest_time
        timeRemaining.value = work_time
        currentInterval.value = 1
    }

    const intervalProgress = computed(() => {
        if(isWorkMode.value) {
            return (timeRemaining.value/workTime.value) * 100
        } else {
            return (timeRemaining.value/restTime.value) * 100
        }
    })

    return {
        isPaused, 
        currentInterval, 
        totalIntervals, 
        timeRemaining, 
        isWorkMode,
        currentRPE,
        workTime,
        restTime,
        intervalProgress,
        incline, 
        speed,
        togglePause, 
        nextInterval, 
        prevInterval,
        initializeWorkout
    }
})