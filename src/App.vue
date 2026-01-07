<script setup>
  import { storeToRefs } from 'pinia';
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
  import { useTaskStore } from './store/TaskStore';
  import { ref } from 'vue';

  const TaskStore = useTaskStore();
  const filter = ref('all')
  TaskStore.getTasks();
  // so we use them as refs - example - name used to be TaskStore.name
 const { getTasks, isLoading, tasks, totalCount, favsCount, favs, name } =  storeToRefs(TaskStore)
</script>



<template>
  <main>
    <header>
      <img src="./assets//pinia-logo.svg" alt="Pinia Logo">
      <h1>{{ name }} <br> With Pinia </h1>
    </header>
    <div>
      <TaskForm />
    </div>
    <nav class="m-6 flex justify-center space-x-3">
      <button @click="filter= 'all'"  class="bg-gray-200 rounded-full p-3">
        All
      </button>
      <button @click="filter='favs'" class="bg-red-200 rounded-full p-3">
        Favorites
      </button>
    </nav>

    <div v-if="TaskStore.isLoading">
      Loading tasks ......
    </div>
    <!-- task list -->
    <div class="grid justify-items-center" v-if="filter==='all'" >
      <h1>All Tasks</h1>
      <span>{{ TaskStore.totalCount }} </span>
      <div v-for="task in TaskStore.tasks" :key="task.id" >
        <TaskDetails :task="task" />
      </div>
    </div>
     <div class="grid justify-items-center" v-if="filter==='favs'" >
      <h1>Favorite Tasks</h1>
      <span>{{ TaskStore.favsCount }}</span>
      <div v-for="task in TaskStore.favs" :key="task.id" >
        <TaskDetails :task="task" />
      </div>
    </div>
      <button @click="TaskStore.$reset">RESET STORE</button>
   
  </main>
</template>

