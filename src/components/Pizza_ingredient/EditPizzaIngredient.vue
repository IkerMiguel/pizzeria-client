<template>
  <div class="container">
    <h1 class="text-primary fw-bold">
      Editar Ingrediente de Pizza
      <button class="btn btn-secondary mx-2" @click="cancelar">
        Cancelar
      </button>
    </h1>
    <div class="card">
      <div class="card-header fw-bold">Editar Asignación</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaIngredient">
          <div class="row mb-3">
            <label for="pizza_id" class="form-label">Pizza:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </div>
              <select
                class="form-select"
                id="pizza_id"
                v-model="pizzaIngredient.pizza_id"
              >
                <option
                  v-for="pizza in pizzas"
                  :key="pizza.id"
                  :value="pizza.id"
                >
                  {{ pizza.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="ingredient_id" class="form-label">Ingrediente:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="carrot" />
              </div>
              <select
                class="form-select"
                id="ingredient_id"
                v-model="pizzaIngredient.ingredient_id"
              >
                <option
                  v-for="ingredient in ingredients"
                  :key="ingredient.id"
                  :value="ingredient.id"
                >
                  {{ ingredient.name }}
                </option>
              </select>
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPizzaSlice, faCarrot } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'EditPizzaIngredient',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      pizzaIngredient: {
        id: null,
        pizza_id: null,
        ingredient_id: null,
      },
      pizzas: [],
      ingredients: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'PizzaIngredientIndex' });
    },
    async updatePizzaIngredient() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/pizza_ingredients/${this.pizzaIngredient.id}`,
          {
            pizza_id: this.pizzaIngredient.pizza_id,
            ingredient_id: this.pizzaIngredient.ingredient_id,
          }
        );

        if (res.status === 200 && res.data.success) {
          this.$router.push({ name: 'PizzaIngredientIndex' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ingrediente de pizza actualizado',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo actualizar el ingrediente de pizza.',
          });
        }
      } catch (error) {
        console.error('Error al actualizar el ingrediente de pizza:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al actualizar.',
        });
      }
    },
    async loadPizzas() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pizzas');
        this.pizzas = response.data.pizzas;
      } catch (error) {
        console.error('Error al cargar las pizzas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron cargar las pizzas.',
        });
      }
    },
    async loadIngredients() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ingredients');
        this.ingredients = response.data.ingredients;
      } catch (error) {
        console.error('Error al cargar los ingredientes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron cargar los ingredientes.',
        });
      }
    },
    async fetchPizzaIngredientDetails(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/pizza_ingredients/${id}`
        );
        if (response.data.pizza_ingredient) {
          this.pizzaIngredient = {
            id: response.data.pizza_ingredient.id,
            pizza_id: response.data.pizza_ingredient.pizza_id,
            ingredient_id: response.data.pizza_ingredient.ingredient_id,
          };
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró la asignación de ingrediente de pizza.',
          });
          this.$router.push({ name: 'PizzaIngredientIndex' });
        }
      } catch (error) {
        console.error('Error al cargar los detalles:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron cargar los detalles.',
        });
        this.$router.push({ name: 'PizzaIngredientIndex' });
      }
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    await Promise.all([this.loadPizzas(), this.loadIngredients(), this.fetchPizzaIngredientDetails(id)]);
  },
};
</script>