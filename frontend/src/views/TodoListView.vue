<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
import path from 'path';

  const tasks = ref([]);
  const newTaskName = ref('');
  const newTaskDescription = ref('');

  onMounted(async () => {
    try {
        await getTasks();
    } catch (error) {
      console.error('API Error:', error);
    }
  });

  const getTasks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/todolist');
    tasks.value = response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
};

  const addTask = async()=>{
    try{
        const response = await axios.post('http://localhost:8080/todolist', {
            task: newTaskName.value,
            description: newTaskDescription.value
        });
        newTaskName.value = '';
        newTaskDescription.value = '';
        window.location.reload();
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
                <span :class="{ completed: task.completed }">{{ task.title }}</span>
                <button @click="deleteTask(index)">完了</button>
            </li>
        </ul>
        <input v-model="newTaskName" @keyup.enter="addTodo" placeholder="タスク" />
        <input v-model="newTaskDescription" @keyup.enter="addTodo" placeholder="説明" />
        <button @click="addTask">追加</button>
    </div>
</template>