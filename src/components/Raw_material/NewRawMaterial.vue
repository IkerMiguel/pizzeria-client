<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nueva Materia Prima</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Registrar Materia Prima
      </div>
      <div class="card-body">
        <form @submit.prevent="saveRawMaterial">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" v-model="rawMaterial.name" required />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Descripción:</label>
            <textarea class="form-control" id="description" v-model="rawMaterial.description"></textarea>
          </div>

          <div class="mb-3">
            <label for="unit" class="form-label">Unidad de Medida:</label>
            <input type="text" class="form-control" id="unit" v-model="rawMaterial.unit" required />
          </div>

          <div class="mb-3">
            <label for="stock" class="form-label">Stock Inicial:</label>
            <input type="number" step="0.01" class="form-control" id="stock" v-model="rawMaterial.stock" required />
          </div>

          <button type="submit" class="btn btn-primary">Guardar</button>
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
  name: 'CreateRawMaterial',
  data() {
    return {
      rawMaterial: {
        name: '',
        description: '',
        unit: '',
        stock: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'RawMaterialsIndex' })
    },
    async saveRawMaterial() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/raw_materials', this.rawMaterial)
        if (res.status === 200) {
          this.$router.push({ name: 'RawMaterialsIndex' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Materia prima registrada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch {
        Swal.fire('Error', 'No se pudo registrar la materia prima.', 'error')
      }
    }
  }
}
</script>
