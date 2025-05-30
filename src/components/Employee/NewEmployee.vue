<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Empleado</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Empleado
      </div>
      <div class="card-body">
        <form @submit.prevent="saveEmployee">
          <div class="row mb-3">
            <label for="user_id" class="form-label">ID de Usuario:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input type="number" class="form-control" id="user_id" placeholder="ID del usuario"
                     v-model="employee.user_id" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="position" class="form-label">Puesto:</label>
            <select id="position" class="form-select" v-model="employee.position" required>
              <option disabled value="">Seleccione un puesto</option>
              <option value="cajero">Cajero</option>
              <option value="administrador">Administrador</option>
              <option value="cocinero">Cocinero</option>
              <option value="mensajero">Mensajero</option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="identification_number" class="form-label">Número de Identificación:</label>
            <input type="text" class="form-control" id="identification_number"
                   placeholder="Número de identificación"
                   v-model="employee.identification_number" maxlength="20" required />
          </div>

          <div class="row mb-3">
            <label for="salary" class="form-label">Salario:</label>
            <input type="number" class="form-control" id="salary" placeholder="Salario"
                   v-model="employee.salary" step="0.01" required />
          </div>

          <div class="row mb-3">
            <label for="hire_date" class="form-label">Fecha de Contratación:</label>
            <input type="date" class="form-control" id="hire_date"
                   v-model="employee.hire_date" required />
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewEmployee',
  data() {
    return {
      employee: {
        user_id: '',
        position: '',
        identification_number: '',
        salary: '',
        hire_date: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Employees' })
    },
    async saveEmployee() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/employees', this.employee)
        if (res.status === 200 || res.status === 201) {
          this.$router.push({ name: 'Employees' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado registrado exitosamente',
            showConfirmButton: fa
