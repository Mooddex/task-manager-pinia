<script setup>
    import { useTaskStore } from '@/store/TaskStore';
import { defineProps, ref } from 'vue';
 const props = defineProps(['task', ]);
const taskStore = useTaskStore();
</script>

<template>
    <div class="flex items-center hover:bg-gray-400 p-3 bg-gray-300 m-2 w-full rounded-full">
        <h3>{{ task.title }}</h3> 
        <div class="p-3 cursor-pointer">
            <i
             @click="taskStore.deleteTask(task.id)" class="material-icons"

             >delete</i>

            <i 
            @click="taskStore.toggleFav(task.id)" 
            class="material-icons"
            :class=" task.isFav ? 'text-red-400': '' "
            >favorite</i>
        </div>   
    </div>
</template>
