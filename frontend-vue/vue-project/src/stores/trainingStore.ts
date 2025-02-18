import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface TrainingInterval {
    intervalNumber: number,
    rpe: number,
    pulse: number,
    meters_per_hour: number,
    incline_percent_tenths: number,
    workout_id: number,
}
export const useTrainingStore = defineStore('training', () => {
    
    const trainingData = ref<TrainingInterval[]>([])

    function initializeTrainingData(numberOfIntervals: number) {
        trainingData.value = []

        for(let i = 0; i < numberOfIntervals; i++) {
            addInterval(
                i+1,
                {
                    intervalNumber: i+1,
                    rpe: 11,
                    pulse: 0,
                    meters_per_hour: 0,
                    incline_percent_tenths: 0,
                    workout_id: 1
                }
            )
        }
    }

    
    function addInterval(intervalId: number, interval: TrainingInterval) {
        trainingData.value[intervalId-1] = {
            intervalNumber: interval.intervalNumber,
            rpe: interval.rpe,
            pulse: interval.pulse,
            meters_per_hour: interval.meters_per_hour,
            incline_percent_tenths: interval.incline_percent_tenths,
            workout_id: interval.workout_id
        }
        console.log("The current training data for the session looks like this: ")
        console.log(trainingData.value)
    }

    const submitWorkout = async () => {
        const payload = trainingData.value.map(row => ({ // Prepare data for API
            ...row,
            work_time: 5,
            rest_time: 10
        }))
        //console.log(trainingData.value)
        //console.log(payload)
        const response = await axios.post('http://localhost:8080/workouts', payload)
        console.log('Workout saved: ', response.data)
    }

    return {
        trainingData,
        addInterval,
        initializeTrainingData,
        submitWorkout,
    }
})