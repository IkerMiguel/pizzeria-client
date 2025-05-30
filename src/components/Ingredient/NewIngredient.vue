<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Ingrediente</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Ingrediente
      </div>
      <div class="card-body">
        <form @submit.prevent="saveIngredient">

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="carrot" />
              </div>
              <input type="text" class="form-control" id="name" placeholder="Nombre del ingrediente"
                     v-model="ingredient.name" />
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
  name: 'NewIngredient',
  data() {
    return {
      ingredient: {
        name: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Ingredient' })
    },
    async saveIngredient() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/ingredients', this.ingredient)
        if (res.status === 200) {
          this.$router.push({ name: 'Ingredient' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ingrediente creado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudo guardar el ingrediente', 'error')
      }
    }
  }
}
</script>
