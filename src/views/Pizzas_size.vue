<template>
  <div class="container">
    <h1 class="text-start">Tamaños de Pizzas
      <button @click="newPizzaSize()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID Pizza</th>
          <th>Tamaño</th>
          <th>Precio</th>
          <th>Creado</th>
          <th>Actualizado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pizzaSize, index) in pizzaSizes" :key="pizzaSize.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ pizzaSize.pizza_id }}</td>
          <td>{{ pizzaSize.size }}</td>
          <td>${{ pizzaSize.price.toFixed(2) }}</td>
          <td>{{ formatDate(pizzaSize.created_at) }}</td>
          <td>{{ formatDate(pizzaSize.updated_at) }}</td>
          <td>
            <button @click="editPizzaSize(pizzaSize.id)" class="btn btn-warning mx-1">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deletePizzaSize(pizzaSize.id)" class="btn btn-danger mx-1">
              <font-awesome-icon icon="trash" />
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
  name: 'PizzaSizes',
  data() {
    return {
      pizzaSizes: []
    }
  },
  methods: {
    newPizzaSize() {
      this.$router.push({ name: 'NewPizzaSize' })
    },
    editPizzaSize(id) {
      this.$router.push({ name: 'EditPizzaSize', params: { id } })
    },
    deletePizzaSize(id) {
      Swal.fire({
        title: `¿Desea eliminar el tamaño de pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.pizzaSizes = response.data.pizza_sizes
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el tamaño de pizza.', 'error')
            })
        }
      })
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizza-sizes')
      .then(response => {
        this.pizzaSizes = response.data.pizza_sizes
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de tamaños de pizza.', 'error')
      })
  }
}
</script>
