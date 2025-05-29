<template>
  <div class="container">
    <h1 class="text-start">Listado de Pizzas
      <button @click="newPizza()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Creado</th>
          <th>Actualizado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pizza, index) in pizzas" :key="pizza.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ pizza.name }}</td>
          <td>{{ formatDate(pizza.created_at) }}</td>
          <td>{{ formatDate(pizza.updated_at) }}</td>
          <td>
            <button @click="editPizza(pizza.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deletePizza(pizza.id)" class="btn btn-danger mx-2">
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
  name: 'Pizzas',
  data() {
    return {
      pizzas: []
    }
  },
  methods: {
    newPizza() {
      this.$router.push({ name: 'NewPizza' })
    },
    editPizza(id) {
      this.$router.push({ name: 'EditPizza', params: { id } })
    },
    deletePizza(id) {
      Swal.fire({
        title: `¿Desea eliminar la pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.pizzas = response.data.pizzas
              }
            })
            .catch(error => {
              Swal.fire('Error', 'No se pudo eliminar la pizza.', 'error')
            })
        }
      })
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizzas')
      .then(response => {
        this.pizzas = response.data.pizzas
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo cargar la lista de pizzas.', 'error')
      })
  }
}
</script>
