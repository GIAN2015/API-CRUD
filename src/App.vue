<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/userStore';
import UserFormModal from './components/UserFormModal.vue';
import Swal from 'sweetalert2';

const store = useUserStore();
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);
const viewMode = ref('list');
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

 <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">
        Gestión de Usuarios
      </h1>
      
      <div class="flex items-center gap-4">
        <div v-if="store.users.length > 0" class="bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex">
          <button 
            @click="viewMode = 'list'"
            :class="['p-2 rounded-md transition-all', viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600']"
            title="Vista de Lista"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <button 
            @click="viewMode = 'grid'"
            :class="['p-2 rounded-md transition-all', viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600']"
            title="Vista de Cuadrícula"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>
        </div>

        <button @click="openCreateModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo Usuario
        </button>
      </div>
    </div>

    <div v-if="store.loading" class="flex flex-col justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p class="text-slate-500 animate-pulse">Cargando usuarios...</p>
    </div>

    <div v-else-if="store.error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ store.error }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      
      <div v-if="viewMode === 'list'" class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto w-full">
          <table class="w-full text-sm text-left text-slate-500">
            <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th scope="col" class="px-6 py-4 font-bold">Nombre</th>
                <th scope="col" class="px-6 py-4 font-bold">Usuario</th>
                <th scope="col" class="px-6 py-4 font-bold">Email</th>
                <th scope="col" class="px-6 py-4 font-bold">Teléfono</th>
                <th scope="col" class="px-6 py-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in store.users" :key="user.id" class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">@{{ user.username }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user.phone }}</td>
                <td class="px-6 py-4 text-center whitespace-nowrap flex justify-center gap-3">
                  <button @click="openEditModal(user)" class="text-amber-500 hover:text-amber-700 font-medium transition-colors" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                  </button>
                  <button @click="confirmDelete(user.id)" class="text-red-500 hover:text-red-700 font-medium transition-colors" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="user in store.users" :key="user.id" class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-slate-100 flex flex-col">
          <div class="flex items-center space-x-4 mb-4">
            <div class="bg-indigo-100 rounded-full p-3 text-indigo-600">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-800">{{ user.name }}</h3>
              <p class="text-sm text-slate-500">@{{ user.username }}</p>
            </div>
          </div>
          
          <div class="space-y-2 mb-6 flex-grow">
            <div class="flex items-center text-sm text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2 text-indigo-400"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
              {{ user.email }}
            </div>
            <div class="flex items-center text-sm text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2 text-indigo-400"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
              {{ user.phone }}
            </div>
          </div>

          <div class="flex justify-between border-t pt-4 border-slate-100">
             <button @click="openEditModal(user)" class="flex-1 text-center text-amber-500 hover:text-amber-700 font-medium text-sm py-1 transition-colors">
               Editar
             </button>
             <div class="w-px bg-slate-200 mx-2"></div>
             <button @click="confirmDelete(user.id)" class="flex-1 text-center text-red-500 hover:text-red-700 font-medium text-sm py-1 transition-colors">
               Eliminar
             </button>
          </div>
        </div>
      </div>
      
      <div v-if="store.users.length === 0" class="text-center py-16">
        <p class="text-slate-400 text-lg">No hay usuarios registrados</p>
      </div>
    </div>

    <UserFormModal :isOpen="isModalOpen" :isEdit="isEditMode" :userData="selectedUser" @close="isModalOpen = false"
      @save="saveUser" />
      
  </div>
</template>