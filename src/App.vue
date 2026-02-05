<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/userStore';
import UserFormModal from './components/UserFormModal.vue';
import Swal from 'sweetalert2';

const store = useUserStore();
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);

onMounted(() => {
  store.fetchUsers();
});

const openCreateModal = () => {
  isEditMode.value = false;
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user) => {
  isEditMode.value = true;
  selectedUser.value = { ...user };
  isModalOpen.value = true;
};

const saveUser = (formData) => {
  if (isEditMode.value) {
    store.updateUser(formData);
    Swal.fire({
      title: '¡Actualizado!',
      text: 'Usuario modificado correctamente',
      icon: 'success',
      confirmButtonColor: '#3b82f6'
    });
  } else {
    store.addUser(formData);
    Swal.fire({
      title: '¡Creado!',
      text: 'Usuario agregado correctamente',
      icon: 'success',
      confirmButtonColor: '#3b82f6'
    });
  }
  isModalOpen.value = false;
};

const confirmDelete = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción eliminará al usuario de la vista local.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      store.deleteUser(id);
      Swal.fire({
        title: '¡Eliminado!',
        text: 'El usuario ha sido eliminado.',
        icon: 'success',
        confirmButtonColor: '#3b82f6'
      });
    }
  });
};
</script>

<template>
  <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div class="p-6 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">
            Gestión de Usuarios
          </h1>
     
        </div>
        <button 
          @click="openCreateModal" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo Usuario
        </button>
      </div>
    </div>

    <div v-if="store.loading" class="flex flex-col justify-center items-center h-64 animate-pulse">
      <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p class="mt-4 text-slate-500 font-medium text-lg">Cargando datos desde API...</p>
    </div>

    <div v-else class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-700 text-sm uppercase tracking-wider">
              <th class="p-4 font-bold border-b">Nombre</th>
              <th class="p-4 font-bold border-b">Usuario</th>
              <th class="p-4 font-bold border-b hidden md:table-cell">Email</th>
              <th class="p-4 font-bold border-b hidden lg:table-cell">Teléfono</th>
              <th class="p-4 font-bold border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="user in store.users" 
              :key="user.id" 
              class="hover:bg-blue-50 transition-colors duration-200 group"
            >
              <td class="p-4 font-semibold text-slate-700">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                    {{ user.name.charAt(0) }}
                  </div>
                  {{ user.name }}
                </div>
              </td>
              <td class="p-4 text-slate-600">@{{ user.username }}</td>
              <td class="p-4 text-slate-500 hidden md:table-cell">{{ user.email }}</td>
              <td class="p-4 text-slate-500 hidden lg:table-cell">{{ user.phone }}</td>
              <td class="p-4 flex justify-center gap-3">
                <button 
                  @click="openEditModal(user)" 
                  class="text-amber-500 hover:text-amber-700 hover:bg-amber-100 p-2 rounded-lg transition-all"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button 
                  @click="confirmDelete(user.id)" 
                  class="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="store.users.length === 0" class="text-center py-16">
          <p class="text-slate-400 text-lg">No hay usuarios registrados</p>
        </div>
      </div>
    </div>

    <UserFormModal 
      :isOpen="isModalOpen"
      :isEdit="isEditMode"
      :userData="selectedUser"
      @close="isModalOpen = false"
      @save="saveUser"
    />
  </div>
</template>