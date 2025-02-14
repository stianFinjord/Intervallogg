<script setup lang="ts">
import { useIntervalStore } from '@/stores/interval'
import { useTrainingStore } from '@/stores/trainingStore'
import {ref, reactive, vModelSelect} from 'vue'
import DiscreteSlider from '../components/DiscreteSlider2.vue'

const intervalStore = useIntervalStore()
const trainingStore = useTrainingStore()

trainingStore.initializeTrainingData(intervalStore.totalIntervals)

</script>

<template>
    <div>
        <p>Interval {{ intervalStore.currentInterval }}/{{ intervalStore.totalIntervals }}</p>
    </div>
    <div style="display: grid;">
        <small>Work time: 50s</small>
        <small>Rest time: 20s</small>
    </div>
    <hr>
    <div>
        <h3>{{ intervalStore.isWorkMode ? 'Work' : 'Rest'}} time remaining: {{ intervalStore.timeRemaining }}s</h3>
    </div>
    <div class="input-field">
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
</template>

<style>
.pulse {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 3rem;
}

.pulse input {
    font-size: large;
    justify-content: center;
}

/* .next-button {

} */

.controls {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    
}

.input-field {
    padding-top: 40px;
}
</style>