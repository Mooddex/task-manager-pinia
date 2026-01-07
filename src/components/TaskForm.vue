<script setup>
import { useTaskStore } from '@/store/TaskStore';
import { ref } from 'vue';

const TaskStore = useTaskStore();
const newTask = ref('');
const handleSubmit = () =>{
    if(newTask.value.length>0 ) {
        TaskStore.addTask({
            title: newTask.value,
            isFav: false ,
            id: Math.floor(Math.random() * 100000),
        });
        newTask.value ='';
    };
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text"
        v-model="newTask"
        >
    </form>
</template>