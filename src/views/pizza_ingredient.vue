<template>
  <div class="container">
    <h1 class="text-start">
      Ingredientes por Pizza
      <button @click="newPizzaIngredient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Pizza</th>
          <th scope="col">Ingrediente</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pizzaIngredients" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.id }}</td>
          <td>{{ item.pizza_name }}</td>
          <td>{{ item.ingredient_name }}</td>
          <td>
            <button @click="deletePizzaIngredient(item.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editPizzaIngredient(item.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
          </td>
        </tr>
        <tr v-if="pizzaIngredients.length === 0">
          <td colspan="5" class="text-center">No hay registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PizzaIngredientIndex',
  data() {
    return {
      pizzaIngredients: []
    }
  },
  methods: {
    deletePizzaIngredient(id) {
      Swal.fire({
        title: `¿Desea eliminar el registro con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza_ingredients/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.pizzaIngredients = response.data.pizza_ingredients
              }
            })
        }
      })
    },
    editPizzaIngredient(id) {
      this.$router.push({ name: 'EditPizzaIngredient', params: { id: `${id}` } })
    },
    newPizzaIngredient() {
      this.$router.push({ name: 'NewPizzaIngredient' })
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/pizza_ingredients')
      .then(response => {
        this.pizzaIngredients = response.data.pizza_ingredients
      })
      .catch(error => {
        console.error("Error al cargar datos:", error)
      })
  }
}
</script>
