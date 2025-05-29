<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nueva Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Pizza
      </div>
      <div class="card-body">
        <form @submit.prevent="savePizza">
          <div class="row mb-3">
            <label for="name" class="form-label">Nombre de la Pizza:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </div>
              <input type="text" class="form-control" id="name" placeholder="Nombre de la pizza"
                     v-model="pizza.name" required />
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
  name: 'NewPizza',
  data() {
    return {
      pizza: {
        name: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Pizzas' })
    },
    async savePizza() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/pizzas', this.pizza)
        if (res.status === 200 || res.status === 201) {
          this.$router.push({ name: 'Pizzas' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pizza registrada exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo registrar la pizza.', 'error')
      }
    }
  }
}
</script>
