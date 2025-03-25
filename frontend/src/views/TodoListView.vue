<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const tasks = ref([]);
  const newTodo = ref('');

  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/todolist');
      tasks.value = response.data.tasks;
    } catch (error) {
      console.error('API Error:', error);
    }
  });

  const addTask = async()=>{
    try{
        const response = await axios.post('http://localhost:8080/todolist', {
            task: newTodo.value,
            completed: false
        });
    }catch(error){
        console.error('API Error:', error);
    }
  }

  const deleteTask = async(index)=>{
    try{
        const response = await axios.delete('http://localhost:8080/todolist', {
            data: {
                index: index
            }
        });
    }catch(error){
        console.error('API Error:', error);
    }
  }
</script>

<template>
    <div>
        <h1>Todo List</h1>
        <ul>
            <li v-for="(task, index) in tasks" :key="index">
                <input type="checkbox" v-model="task.completed" />
                <span :class="{ completed: task.completed }">{{ task }}</span>
                <button @click="deleteTask(index)">完了</button>
            </li>
        </ul>
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="タスクを追加" />
        <button @click="addTodo">追加</button>
    </div>
</template>