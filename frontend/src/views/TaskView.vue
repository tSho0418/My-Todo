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
            const response = await axios.get(`http://localhost:8080/todolist/task/${id}`);
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
                description: newTaskDescription.value
            });
            newTaskName.value = '';
            newTaskDescription.value = '';
            router.push('/todolist');
        } catch (error) {
            console.error('API Error:', error);
        }
    }
</script>

<template>
  <div>
    <h1>{{ task.title }}</h1>
    <div>
      <input type="text" v-model="newTaskName" />
      <input type="text" v-model="newTaskDescription" />
      <button @click="updateTask(task.id)">更新</button>
    </div>
  </div>
</template>