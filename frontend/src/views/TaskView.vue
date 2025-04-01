<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';

    const task = ref([]);
    const newTaskName = ref('');
    const newTaskDescription = ref(''); 
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
        try {
            const id = route.params.id;
            const response = await axios.get(`http://localhost:8080/todolist/task/${id}`, {
                withCredentials: true,
            });
            task.value = response.data;
            newTaskName.value = task.value.title;
            newTaskDescription.value = task.value.description;
        } catch (error) {
            console.error('API Error:', error);
        }
    });

    const updateTask = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/todolist/task/${id}`, {
                task: newTaskName.value,
                description: newTaskDescription.value,
            }, {
                withCredentials: true,
            });
            newTaskName.value = '';
            newTaskDescription.value = '';
            router.push('/todolist');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                router.push("/sign-in");
                } else {
                console.error("API Error:", error);
            }
        }
    }
</script>

<template>
  <div>
    <h1>{{ task.title }}</h1>
    <div>
      <input type="text" v-model="newTaskName" placeholder="タスク"/>
      <input type="text" v-model="newTaskDescription" placeholder="詳細" />
      <button @click="updateTask(task.id)">更新</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
}

div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 2rem auto;
}

input[type="text"] {
    width: 100%;
    max-width: 400px;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}
</style>