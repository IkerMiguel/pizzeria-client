<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Pizza</div>
      <div class="card-body">
        <form v-if="pizza" @submit.prevent="updatePizza">
          <div class="row mb-3">
            <label for="name" class="form-label">Nombre de la Pizza:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </div>
              <input type="text" class="form-control" id="name"
                     placeholder="Nombre de la pizza"
                     v-model="pizza.name" required />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
        <div v-else>
          <p>Cargando información de la pizza...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditPizza',
  data() {
    return {
      pizza: null
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Pizzas' })
    },
    async updatePizza() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/pizzas/${this.$route.params.id}`, this.pizza)
        if (res.status === 200) {
          this.$router.push({ name: 'Pizzas' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pizza actualizada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar la pizza.', 'error')
      }
    }
  },
  mounted() {
    axios.get(`http://127.0.0.1:8000/api/pizzas/${this.$route.params.id}`)
      .then(response => {
        this.pizza = response.data.pizza
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo cargar la información de la pizza.', 'error')
        console.error(error)
      })
  }
}
</script>
