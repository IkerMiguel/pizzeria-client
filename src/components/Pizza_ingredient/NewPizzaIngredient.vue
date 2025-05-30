<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Ingrediente por Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Ingrediente por Pizza
      </div>
      <div class="card-body">
        <form @submit.prevent="savePizzaIngredient">

          <div class="row mb-3">
            <label for="pizza_id" class="form-label">Pizza</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="pizza-slice" /></div>
              <select class="form-select" id="pizza_id" v-model="pizzaIngredient.pizza_id" required>
                <option value="" disabled>Seleccione una pizza</option>
                <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">{{ pizza.name }}</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="ingredient_id" class="form-label">Ingrediente</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="carrot" /></div>
              <select class="form-select" id="ingredient_id" v-model="pizzaIngredient.ingredient_id" required>
                <option value="" disabled>Seleccione un ingrediente</option>
                <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">{{ ingredient.name }}</option>
              </select>
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
  name: 'NewPizzaIngredient',
  data() {
    return {
      pizzaIngredient: {
        pizza_id: null,
        ingredient_id: null
      },
      pizzas: [],
      ingredients: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'pizza_ingredients' })  // <-- aquí el nombre corregido
    },

    async savePizzaIngredient() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/pizza_ingredients', this.pizzaIngredient) // usa underscore si esa es la ruta
        if (res.status === 200 || res.status === 201) {
          this.$router.push({ name: 'pizza_ingredients' }) // <-- y aquí también
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ingrediente por Pizza guardado',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo guardar el registro', 'error')
      }
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizzas')
      .then(response => {
        this.pizzas = response.data.pizzas
      })

    axios.get('http://127.0.0.1:8000/api/ingredients')
      .then(response => {
        this.ingredients = response.data.ingredients
      })
  }
}
</script>
