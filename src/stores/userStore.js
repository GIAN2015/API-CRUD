import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('users', () => {
  // Estado
  const users = ref([]);
  const loading = ref(false);

  // Acciones
  
  // 1. Obtener usuarios (Requerimiento [cite: 4, 11])
// En src/stores/userStore.js

  const fetchUsers = async () => {
    loading.value = true;
    try {
      // --- INICIO DEL TRUCO ---
      // Esperar 1.5 segundos artificialmente para mostrar el loader
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      // --- FIN DEL TRUCO ---

      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      // [cite: 11] Consumir la API
      const data = await response.json();
      
      users.value = data.map(u => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone
      }));
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      loading.value = false; // [cite: 10, 47] Ocultar loader
    }
  };

  // 2. Agregar Usuario Localmente (Requerimiento [cite: 22, 23])
  const addUser = (userData) => {
    // Generar ID automático basado en el último ID existente
    const maxId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) : 0;
    const newUser = {
      ...userData,
      id: maxId + 1
    };
    users.value.push(newUser);
  };

  // 3. Editar Usuario Localmente (Requerimiento [cite: 35])
  const updateUser = (updatedUser) => {
    const index = users.value.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users.value[index] = updatedUser;
    }
  };

  
  // 4. Eliminar Usuario Localmente (Requerimiento [cite: 45])
  const deleteUser = (id) => {
    users.value = users.value.filter(u => u.id !== id);
  };

  return { users, loading, fetchUsers, addUser, updateUser, deleteUser };
});