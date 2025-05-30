<template>
  <div class="container">
    <h1 class="text-start">Listado de Ingredientes
      <button @click="newIngredient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
       <tbody>
      <tr v-for="(Ingredient, index) in ingredients" :key="Ingredient.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ Ingredient.id }}</td>
        <td>{{ Ingredient.name }}</td>
        <td>
          <button @click="deleteIngredient(Ingredient.id)" class="btn btn-danger mx-2">
            <font-awesome-icon icon="trash" />
          </button>
          <button @click="editIngredient(Ingredient.id)" class="btn btn-warning mx-2">
            <font-awesome-icon icon="pencil" />
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
  name: 'IngredientIndex',
  data() {
    return {
      ingredients: []
    }
  },
  methods: {
    deleteIngredient(id) {
      Swal.fire({
        title: `¿Desea eliminar el ingrediente con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.fetchIngredients();
              } else {
                Swal.fire('Error', response.data.message || 'No se pudo eliminar el ingrediente', 'error')
              }
            })
            .catch(error => {
              console.error("Error al eliminar el ingrediente:", error)
              Swal.fire('Error', 'Ocurrió un error al intentar eliminar el ingrediente', 'error')
            })
        }
      })
    },
    editIngredient(id) {
        this.$router.push({ path: `/editIngredient/${id}` });
    },
    newIngredient() {
      this.$router.push({ name: 'NewIngredient' })
    },
    fetchIngredients() {
      axios
        .get('http://127.0.0.1:8000/api/ingredients')
        .then(response => {
          this.ingredients = response.data.ingredients;
        })
        .catch(error => {
          console.error("Error al cargar ingredientes:", error)
        })
    },
  },
  mounted() {
    this.fetchIngredients();
  }
}
</script>