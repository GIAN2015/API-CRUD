# User Management System (Vue 3 + Pinia) 

Solución a la prueba técnica para Frontend Developer. Aplicación CRUD que consume la API de JSONPlaceholder, gestiona el estado globalmente y ofrece una experiencia de usuario fluida.

##  Stack Tecnológico

* **Vue 3:** Composition API (`<script setup>`) para una lógica modular y moderna.
* **Pinia:** Gestión de estado global (Store) para manejar la data de usuarios de forma eficiente.
* **Vite:** Entorno de desarrollo ultrarrápido.
* **Tailwind CSS:** Estilizado vía CDN para garantizar ligereza y rapidez en la prueba sin configuraciones complejas de PostCSS.
* **SweetAlert2:** Feedback visual (alertas) para mejorar la UX en interacciones críticas.

##  Funcionalidades Clave

1.  **Carga Simulada (Loader):** Se implementó un *delay* artificial de 1.5s en el Store para demostrar visualmente el estado de carga (`isLoading`) antes de recibir los datos de la API.
2.  **CRUD Local Completo:**
    * **Crear:** Validación de formulario y generación automática de IDs.
    * **Leer:** Tabla responsive con datos de la API.
    * **Actualizar:** Edición reactiva mediante Modal reutilizable.
    * **Eliminar:** Confirmación de seguridad antes de borrar un registro.
3.  **UI/UX:** Diseño limpio, responsive y manejo de errores visuales.

##  Cómo ejecutar el proyecto

Sigue estos pasos para probar la aplicación en local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/GIAN2015/API-CRUD
    ```

2.  **Instalar dependencias:**
    ```bash
    cd user-crud-vue
    npm install
    ```

3.  **Correr el servidor:**
    ```bash
    npm run dev
    ```

4.  Abrir el navegador en la URL que muestra la terminal (`http://localhost:5173/`).

---
**Nota para el evaluador:**
Para facilitar la revisión y evitar conflictos de entorno, **Tailwind CSS** se ha implementado vía CDN en el `index.html`. No es necesario compilar estilos CSS adicionales.

---
Desarrollado por GIAN CARLOS SINARAHUA CÁRDENAS
