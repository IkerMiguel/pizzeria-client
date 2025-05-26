<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Materias Primas de Pizza</h1>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span class="fw-bold">Listado</span>
        <router-link :to="{ name: 'PizzaRawMaterialCreate' }" class="btn btn-primary">
          Crear
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Pizza</th>
              <th>Materia Prima</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pizzaRM, index) in pizzaRawMaterials" :key="pizzaRM.id">
              <td>{{ index + 1 }}</td>
              <td>{{ pizzaRM.pizza.name }}</td>
              <td>{{ pizzaRM.raw_material.name }}</td>
              <td>{{ pizzaRM.quantity }}</td>
              <td>
                <router-link :to="{ name: 'PizzaRawMaterialEdit', params: { id: pizzaRM.id } }" class="btn btn-warning btn-sm">Editar</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PizzaRawMaterialIndex',
  data() {
    return {
      pizzaRawMaterials: []
    }
  },
  mounted() {
    this.loadPizzaRawMaterials()
  },
  methods: {
    async loadPizzaRawMaterials() {
      const res = await axios.get('http://127.0.0.1:8000/api/pizza_raw_materials')
      this.pizzaRawMaterials = res.data.pizza_raw_materials
    }
  }
}
</script>