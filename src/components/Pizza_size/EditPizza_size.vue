<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Tamaño de Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Tamaño de Pizza</div>
      <div class="card-body">
        <form v-if="pizzaSize" @submit.prevent="updatePizzaSize">
          <div class="row mb-3">
            <label for="pizza_id" class="form-label">ID de la Pizza:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </div>
              <input
                type="number"
                class="form-control"
                id="pizza_id"
                placeholder="ID de la pizza"
                v-model="pizzaSize.pizza_id"
                required
                min="1"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <select id="size" class="form-select" v-model="pizzaSize.size" required>
              <option disabled value="">Seleccione un tamaño</option>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="price" class="form-label">Precio:</label>
            <input
              type="number"
              class="form-control"
              id="price"
              placeholder="Precio"
              v-model.number="pizzaSize.price"
              step="0.01"
              min="0"
              required
            />
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
        <div v-else>
          <p>Cargando información del tamaño de pizza...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditPizzaSize',
  data() {
    return {
      pizzaSize: null
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'PizzaSizes' })
    },
    async updatePizzaSize() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/pizza-sizes/${this.$route.params.id}`,
          this.pizzaSize
        )
        if (res.status === 200) {
          this.$router.push({ name: 'PizzaSizes' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tamaño de pizza actualizado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el tamaño de pizza.', 'error')
      }
    }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/pizza-sizes/${this.$route.params.id}`)
      .then(response => {
        this.pizzaSize = response.data.pizzaSize
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo cargar la información del tamaño de pizza.', 'error')
        console.error(error)
      })
  }
}
</script>
