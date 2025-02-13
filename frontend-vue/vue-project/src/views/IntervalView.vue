<script setup lang="ts">
import { useIntervalStore } from '@/stores/interval';
import {ref, reactive} from 'vue'
import DiscreteSlider from '../components/DiscreteSlider.vue'

const intervalStore = useIntervalStore();

</script>

<template>
    <div>
        <p>Interval {{ intervalStore.currentInterval }}/5</p>
    </div>
    <div>
        <h3>{{ intervalStore.isWorkMode ? 'Work' : 'Rest'}} time remaining: {{ intervalStore.timeRemaining }}s</h3>
    </div>
    <div class="pulse">
        <input 
        type="number"
        id="pulse"
        placeholder="Pulse..."
        >
    </div>
    
    <div>
        <DiscreteSlider/>
    </div>

    <div class="controls">
        <button @click="intervalStore.prevInterval">Prev</button>
        <h1 @click="intervalStore.togglePause">
            <span v-if="intervalStore.isPaused">▶</span>
            <span v-else>❚❚</span>

        </h1>
        <button @click="intervalStore.nextInterval">Next</button>
    </div>


    This is what the actual interval thing looks like
</template>

<style>
.pulse {
    display: flex;
    justify-content: center;
    width: 100%;
}

.next-button {

}

.controls {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    
}
</style>