<template>
    <footer class="app-footer">{{ stats.active }} more to do, {{ stats.done }} done</footer>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export interface Stats {
    active: number,
    done: number,
}

export default defineComponent({
    props: {
        stats: {
            type: Object as PropType<Stats>,
            required: true
        }
    }
})
</script>