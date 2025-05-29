<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Cliente
      </div>
      <div class="card-body">
        <form @submit.prevent="saveClient">
          <div class="row mb-3">
            <label for="user_id" class="form-label">ID de Usuario:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input type="number" class="form-control" id="user_id" placeholder="ID del usuario"
                     v-model="client.user_id" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <input type="text" class="form-control" id="address" placeholder="Dirección del cliente"
                     v-model="client.address" />
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone" class="form-label">Teléfono:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="phone" />
              </div>
              <input type="text" class="form-control" id="phone" placeholder="Teléfono del cliente"
                     v-model="client.phone" />
            </div>
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
  name: 'NewClient',
  data() {
    return {
      client: {
        user_id: '',
        address: '',
        phone: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Clients' })
    },
    async saveClient() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/clients', this.client)
        if (res.status === 200) {
          this.$router.push({ name: 'Clients' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente registrado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo registrar el cliente.', 'error')
      }
    }
  }
}
</script>
