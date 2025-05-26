<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Materia Prima</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Actualizar Materia Prima
      </div>
      <div class="card-body">
        <form @submit.prevent="updateRawMaterial">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" v-model="rawMaterial.name" required />
          </div>

          <div class="mb-3">
            <label for="unit" class="form-label">Unidad de Medida:</label>
            <input type="text" class="form-control" id="unit" v-model="rawMaterial.unit" required />
          </div>

          <div class="mb-3">
            <label for="stock" class="form-label">Stock:</label>
            <input type="number" step="0.01" class="form-control" id="stock" v-model="rawMaterial.current_stock" required />
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
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
  name: 'EditRawMaterial',
  data() {
    return {
      rawMaterial: {
        name: '',
        unit: '',
        current_stock: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Raw_material' })
    },
    async updateRawMaterial() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/raw-materials/${this.$route.params.id}`,
          this.rawMaterial
        )
        if (res.status === 200) {
          this.$router.push({ name: 'Raw_material' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Materia prima actualizada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch {
        Swal.fire('Error', 'No se pudo actualizar la materia prima.', 'error')
      }
    },
    async loadRawMaterial() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/raw-materials/${this.$route.params.id}`)
        this.rawMaterial = res.data.raw_material
      } catch {
        Swal.fire('Error', 'No se pudo cargar la materia prima.', 'error')
      }
    }
  },
  mounted() {
    this.loadRawMaterial()
  }
}
</script>
