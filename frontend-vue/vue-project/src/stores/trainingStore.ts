import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface TrainingInterval {
    interval_number: number,
    rpe: number,
    pulse: number,
    meters_per_hour: number,
    incline_percent_tenths: number,
    workout_id: number,
}

export interface DragData extends TrainingInterval {
    work_time: number,
    rest_time: number
}

export interface WorkoutPayload {
    user_id: number,
    comment: string,
    drags: DragData[]
}

export const useTrainingStore = defineStore('training', () => {
    
    const trainingData = ref<TrainingInterval[]>([])
    const workoutComment = ref<string>()

    function initializeTrainingData(numberOfIntervals: number) {
        trainingData.value = []

        for(let i = 0; i < numberOfIntervals; i++) {
            addInterval(
                i+1,
                {
                    interval_number: i+1,
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
            interval_number: interval.interval_number,
            rpe: interval.rpe,
            pulse: interval.pulse,
            meters_per_hour: interval.meters_per_hour,
            incline_percent_tenths: interval.incline_percent_tenths,
            workout_id: interval.workout_id
        }
        // Debugging
        console.log("The current training data for the session looks like this: ")
        console.log(trainingData.value)
    }

    const submitWorkout = async () => {
        const drags: DragData[] = trainingData.value.map(row => ({ // Prepare data for API
            ...row,
            work_time: 5,
            rest_time: 10
        }))
        const payload: WorkoutPayload = {
            user_id: 4,
            comment: workoutComment.value || '',
            drags
        }
        const response = await axios.post('http://localhost:8080/workouts', payload)
        console.log('Workout saved: ', response.data)
    }

    return {
        trainingData,
        workoutComment,
        addInterval,
        initializeTrainingData,
        submitWorkout,
    }
})