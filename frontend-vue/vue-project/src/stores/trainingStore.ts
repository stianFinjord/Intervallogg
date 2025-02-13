import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface TrainingInterval {
    intervalNumber: number,
    rpe: number,
    pulse: number,
    speed: number,
    incline: number,
    workoutId: number,
}
export const useTrainingStore = defineStore('training', () => {
    
    const trainingData = ref<TrainingInterval[]>([])
    
    function addInterval(intervalId: number, interval: TrainingInterval) {
        trainingData.value[intervalId-1] = {
            intervalNumber: interval.intervalNumber,
            rpe: interval.rpe,
            pulse: interval.pulse,
            speed: interval.speed,
            incline: interval.incline,
            workoutId: interval.workoutId
        }
        console.log("The current training data for the session looks like this: ")
        console.log(trainingData.value)
    }

 /*    function addInterval(
        intervalNumber: number,
        rpe: number,
        pulse: 0,
        speed: 0,
        incline: 0,
        workoutId: number
    ) {
        trainingData.value.push({
            intervalNumber, 
            rpe, 
            pulse,
            speed,
            incline,
            workoutId
        })
    } */

    // function updateInterval(id: number, interval: TrainingInterval)

    return {
        trainingData,
        addInterval

    }
})