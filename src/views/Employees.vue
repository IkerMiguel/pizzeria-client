<template>
  <div class="container">
    <h1 class="text-start">Listado de Empleados
      <button @click="newEmployee()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID de Usuario</th>
          <th>Posición</th>
          <th>Número de Identificación</th>
          <th>Salario</th>
          <th>Fecha de Contratación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ employee.user_id }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.identification_number }}</td>
          <td>${{ Number(employee.salary).toFixed(2) }}</td>
          <td>{{ employee.hire_date }}</td>
          <td>
            <button @click="editEmployee(employee.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteEmployee(employee.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Employees',
  data() {
    return {
      employees: []
    }
  },
  methods: {
    newEmployee() {
      this.$router.push({ name: 'NewEmployee' })
    },
    editEmployee(id) {
      this.$router.push({ name: 'EditEmployee', params: { id } })
    },
    deleteEmployee(id) {
      Swal.fire({
        title: `¿Desea eliminar el empleado con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/employees/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.employees = response.data.employees
              }
            })
            .catch(error => {
              Swal.fire('Error', 'No se pudo eliminar el empleado.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/employees')
      .then(response => {
        this.employees = response.data.employees
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo cargar la lista de empleados.', 'error')
      })
  }
}
</script>
