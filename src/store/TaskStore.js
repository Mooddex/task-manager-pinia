import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore',{
    state: () =>({
        tasks:[],
        isLoading: false,
        name:'ToDo Tasks',
    }),
    getters:{
        favs(){
            return this.tasks.filter(t => t.isFav);
        },
        favsCount(){
            return this.tasks.reduce((p,c)=>{
                return c.isFav ? p+1 : p
            },0)
        },
        totalCount(){
            return this.tasks.length;
        }
    },
    actions:{
        async getTasks(){
            this.isLoading = true ;
            const res = await fetch('http://localhost:2727/tasks');
            const data = await res.json();

            this.tasks = data ;
            this.isLoading = false ;
        },
        async addTask(task){
            this.tasks.push(task);

             await fetch('http://localhost:2727/tasks',{
                method: 'POST',
                body: JSON.stringify(task),
                headers:{'Content-Type': 'application/json'}
            });
        },
        async deleteTask(id){
            this.tasks = this.tasks.filter((task)=>{
              return  task.id !== id;
            });
              await fetch('http://localhost:2727/tasks/'+ id,{
                method: 'DELETE',
            });
        },
        async toggleFav(id){
            const task = this.tasks.find((t)=>t.id === id)
            task.isFav = !task.isFav

             await fetch('http://localhost:2727/tasks/'+ id ,{
                method: 'PATCH',
                body: JSON.stringify({isFav : task.isFav}),
                headers:{'Content-Type': 'application/json'}
            });
        },
        
    },
});