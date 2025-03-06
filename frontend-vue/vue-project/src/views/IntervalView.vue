<script setup lang="ts">
import { useIntervalStore } from '@/stores/interval'
import { useTrainingStore } from '@/stores/trainingStore'
import {ref, reactive, vModelSelect} from 'vue'
import DiscreteSlider from '../components/DiscreteSlider2.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const intervalStore = useIntervalStore()
const trainingStore = useTrainingStore()

trainingStore.initializeTrainingData(intervalStore.totalIntervals)

</script>

<template>
    <div class="interval-container">
        <div class="top-section">
            <ProgressBar v-model.number = "intervalStore.intervalProgress"/>
            <div>
                <h2>Interval {{ intervalStore.currentInterval }}/{{ intervalStore.totalIntervals }}</h2>
            </div>
            <div style="display: grid;">
                <p>Work time: {{ intervalStore.workTime }}s</p>
                <p>Rest time: {{ intervalStore.restTime }}s</p>
            </div>
            <hr>
            <div>
                <h3>{{ intervalStore.isWorkMode ? 'Work' : 'Rest'}} time remaining: {{ intervalStore.timeRemaining }}s</h3>
                <h3 v-if="!intervalStore.isWorkMode">Fill in your data below</h3>
            </div>
        </div>
        <div class="bottom-section">
            
            <div class="speed-and-incline">
                <div class="speed">
                    <p>Incline %: </p>
                    <input
                        v-model.number="trainingStore.trainingData[intervalStore.currentInterval-1].incline_percent_tenths"
                        type="number"                    
                    >
                </div>
                <div class="speed">
                    <p>Speed km/h: </p>
                    <input
                        v-model.number="trainingStore.trainingData[intervalStore.currentInterval-1].meters_per_hour"
                        type="number"                    
                    >
                </div>
            </div>
            
            <div class="pulse" >
                <input 
                v-model.number="trainingStore.trainingData[intervalStore.currentInterval-1].pulse"
                type="number"
                id="pulse"
                placeholder="Pulse..."
                @click="($event) => ($event.target as HTMLInputElement).select()"
                >
            </div>
            
            <div>
                <!-- <DiscreteSlider v-model.number=intervalStore.currentRPE /> -->
                <DiscreteSlider v-model.number="trainingStore.trainingData[intervalStore.currentInterval - 1].rpe" />
            </div>
            
            <div class="controls">
                <button @click="intervalStore.prevInterval">Prev</button>
                <h1 @click="intervalStore.togglePause">
                    <span v-if="intervalStore.isPaused">▶</span>
                    <span v-else>❚❚</span>
                    
                </h1>
                <button @click="intervalStore.nextInterval">Next</button>
            </div>
            
        </div>
    </div>
</template>

<style scoped>

.interval-container {
    height: 85vh;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
}

.top-section {
    
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;

}

.bottom-section {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}
.speed-and-incline {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.speed {
    flex-direction: column;
    padding: 2rem;
    
}

.speed input {
    max-width: 5rem;
    font-size: large;
    height: 3rem;
    border: solid black 2px;
    border-radius: 5px;
}

.pulse {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 3rem;
}
.pulse input {
    font-size: large;
    justify-content: center;
    border: solid black 2px;
    border-radius: 5px;
}

.controls {
    display: flex;
    justify-content: space-between;
    padding: 1em;
}

</style>