<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Ingrediente</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Registro
      </div>
      <div class="card-body">
        <form @submit.prevent="updateIngredient">
          
          <div class="row mb-3">
            <label for="id" class="form-label">ID:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="hashtag" />
              </div>
              <input type="text" class="form-control" id="id" disabled v-model="ingredient.id" />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="carrot" />
              </div>
              <input type="text" class="form-control" id="name" placeholder="Nombre del ingrediente" v-model="ingredient.name" />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
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
  name: 'IngredientEdit',
  data() {
    return {
      ingredient: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Ingredient' })
    },
    async updateIngredient() {
      const res = await axios.put(`http://127.0.0.1:8000/api/ingredients/${this.ingredient.id}`, this.ingredient)
      if (res.status === 200) {
        this.$router.push({ name: 'Ingredient' })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ingrediente actualizado exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: res.data.message || 'No se pudo actualizar el ingrediente',
        })
      }
    }
  },
  mounted() {
    this.ingredient.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/ingredients/${this.ingredient.id}`)
      .then(response => {
        if (response.data.ingredient) {
          this.ingredient = response.data.ingredient
        } else {
          this.ingredient = response.data
        }
      })
      .catch(error => {
        console.error('Error cargando datos del ingrediente:', error)
      })
  }
}
</script>