<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
import path from 'path';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';

  const tasks = ref([]);
  const newTaskName = ref('');
  const newTaskDescription = ref('');
  const router = useRouter();

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

  const deleteTask = async(id)=>{
    try{
        const response = await axios.delete(`http://localhost:8080/todolist/task/${id}`, {
            id: id
        });
        window.location.reload();
    }catch(error){
        console.error('API Error:', error);
    }
  }

  const updateTask = (id)=>{
    router.push(`/todolist/task/${id}`);
  }
</script>

<template>
    <div>
        <Header />
        <ul>
            <li v-for="(task, index) in tasks" :key="index">
                <input type="checkbox" v-model="task.completed" />
                <span :class="{ completed: task.completed }">{{ task.title }}</span>
                <button @click="updateTask(task.id)">編集</button>
                <button @click="deleteTask(task.id)">完了</button>
                
            </li>
        </ul>
        <input v-model="newTaskName" @keyup.enter="addTodo" placeholder="タスク" />
        <input v-model="newTaskDescription" @keyup.enter="addTodo" placeholder="説明" />
        <button @click="addTask">追加</button>
    </div>
</template>