import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useTrainingStore } from '@/stores/trainingStore';

export const useIntervalStore = defineStore('interval', () => {
    const isPaused = ref(true)
    const isWorkMode = ref(true)
    const currentInterval = ref(1)
    const totalIntervals = ref(7)
    const workTime = ref(7)
    const restTime = ref(3)
    const timeRemaining = ref(2)
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
                if(isWorkMode.value) {
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
    /* function nextInterval() {
        trainingStore.addInterval(
            currentInterval.value,
            {
                intervalNumber: currentInterval.value,
                rpe: trainingStore.trainingData[currentInterval.value-1].rpe,
                pulse: 3,
                speed: 4,
                incline: 5,
                workoutId: 6
            }
        )
        if(currentInterval.value < totalIntervals.value) {
            currentInterval.value++
            updateValues()
        } else {
            router.push('submit')
        }
    } */
    function prevInterval() { //TODO: Make check if user wants to exit if value is 1
        if (currentInterval.value > 1) {
            currentInterval.value--
            updateValues()
        }
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
        prevInterval
    }
})