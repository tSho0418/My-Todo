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
    const response = await axios.get('http://localhost:8080/todolist', {
      withCredentials: true,
    });
    tasks.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      router.push("/sign-in");
    } else {
      console.error("API Error:", error);
    }
  }
};

  const addTask = async()=>{
    try{
        const response = await axios.post('http://localhost:8080/todolist', {
            task: newTaskName.value,
            description: newTaskDescription.value,
            withCredentials: true,
        },
        {
          withCredentials: true,
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
            id: id,
            withCredentials: true,
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
    <div class="container">
        <Header />
        <ul class="task-list">
            <li v-for="(task, index) in tasks" :key="index">
                <input type="checkbox" v-model="task.completed" />
                <span :class="{ completed: task.completed }">{{ task.title }}</span>
                <button @click="updateTask(task.id)">編集</button>
                <button @click="deleteTask(task.id)">完了</button>
                
            </li>
        </ul>
        <div class="task-input-container">
          <input id="task-form" v-model="newTaskName" @keyup.enter="addTodo" placeholder="タスク" />
          <input id="description-form" v-model="newTaskDescription" @keyup.enter="addTodo" placeholder="説明" />
          <button id="add-button" @click="addTask">追加</button>
        </div>
    </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

.task-list {
  margin-top: 20px;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.task-list li:last-child {
  border-bottom: none;
}

.task-list input[type="checkbox"] {
  margin-right: 10px;
}

.task-list .completed {
  text-decoration: line-through;
  color: #888;
}

.task-list button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-list button:hover {
  background-color: #c82333;
}

.task-input-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#task-form,
#description-form {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex: 1;
}

#add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#add-button:hover {
  background-color: #0056b3;
}
</style>