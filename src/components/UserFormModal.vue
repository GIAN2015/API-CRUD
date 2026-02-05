<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    isEdit: Boolean,
    userData: Object
});

const emit = defineEmits(['close', 'save']);

// Modelo local del formulario
const form = ref({
    name: '',
    username: '',
    email: '',
    phone: ''
});

const errors = ref({});

// Sincronizar datos si es edición [cite: 34]
watch(() => props.userData, (newData) => {
    if (props.isEdit && newData) {
        form.value = { ...newData };
    } else {
        resetForm();
    }
}, { deep: true });

const resetForm = () => {
    form.value = { name: '', username: '', email: '', phone: '' };
    errors.value = {};
};

// Validación simple [cite: 21, 49]
const validate = () => {
    errors.value = {};
    if (!form.value.name) errors.value.name = 'El nombre es obligatorio';
    if (!form.value.username) errors.value.username = 'El usuario es obligatorio';

    // Validación de email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.value.email) {
        errors.value.email = 'El email es obligatorio';
    } else if (!emailRegex.test(form.value.email)) {
        errors.value.email = 'El formato del email no es válido';
    }

    return Object.keys(errors.value).length === 0;
};

const handleSave = () => {
    if (validate()) {
        emit('save', form.value);
        resetForm();
    }
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <div
            class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">

            <div class="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h2 class="text-xl font-bold text-slate-800">{{ isEdit ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
                <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                    <input v-model="form.name" type="text"
                        class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ej: Juan Pérez">
                    <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Usuario</label>
                    <input v-model="form.username" type="text"
                        class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ej: Juan99">
                    <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input v-model="form.email" type="email"
                        class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="juan@email.com">
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                    <input v-model="form.phone" type="text"
                        class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="999-999-999">
                </div>
            </div>

            <div class="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                <button @click="$emit('close')"
                    class="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors">Cancelar</button>
                <button @click="handleSave"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md shadow-blue-500/30 transition-all">Guardar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilos básicos para el Modal [cite: 48, 50] */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.form-group input {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.error {
    color: red;
    font-size: 0.8rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn-save {
    background-color: #42b983;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.btn-cancel {
    background-color: #999;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>