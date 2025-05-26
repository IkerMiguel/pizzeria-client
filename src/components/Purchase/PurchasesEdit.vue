<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Registro de Compra</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Actualizar Compra
      </div>
      <div class="card-body">
        <form @submit.prevent="updatePurchase">
          <div class="mb-3">
            <label for="supplier" class="form-label">Proveedor:</label>
            <select v-model="purchase.supplier_id" class="form-select" id="supplier" required>
              <option value="" disabled>Seleccione un proveedor</option>
              <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="raw_material" class="form-label">Materia Prima:</label>
            <select v-model="purchase.raw_material_id" class="form-select" id="raw_material" required>
              <option value="" disabled>Seleccione una materia prima</option>
              <option v-for="rawMaterial in rawMaterials" :key="rawMaterial.id" :value="rawMaterial.id">
                {{ rawMaterial.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad:</label>
            <input type="number" step="0.01" class="form-control" id="quantity" v-model="purchase.quantity" required />
          </div>

          <div class="mb-3">
            <label for="purchase_price" class="form-label">Precio de Compra:</label>
            <input type="number" step="0.01" class="form-control" id="purchase_price" v-model="purchase.purchase_price" required />
          </div>

          <div class="mb-3">
            <label for="purchase_date" class="form-label">Fecha de Compra:</label>
            <input type="date" class="form-control" id="purchase_date" v-model="purchase.purchase_date" required />
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
  name: 'EditPurchase',
  data() {
    return {
      purchase: {
        supplier_id: '',
        raw_material_id: '',
        quantity: '',
        purchase_price: '',
        purchase_date: ''
      },
      suppliers: [],
      rawMaterials: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'PurchasesIndex' })
    },
    async loadSuppliers() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/suppliers')
        this.suppliers = res.data.suppliers
      } catch {
        Swal.fire('Error', 'No se pudieron cargar los proveedores.', 'error')
      }
    },
    async loadRawMaterials() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/raw_materials')
        this.rawMaterials = res.data.raw_materials
      } catch {
        Swal.fire('Error', 'No se pudieron cargar las materias primas.', 'error')
      }
    },
    async loadPurchase() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/purchases/${this.$route.params.id}`)
        this.purchase = res.data.purchase
        // Ajustar formato fecha para input date (yyyy-mm-dd)
        if (this.purchase.purchase_date) {
          this.purchase.purchase_date = this.purchase.purchase_date.split('T')[0]
        }
      } catch {
        Swal.fire('Error', 'No se pudo cargar la compra.', 'error')
      }
    },
    async updatePurchase() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/purchases/${this.$route.params.id}`,
          this.purchase
        )
        if (res.status === 200) {
          this.$router.push({ name: 'PurchasesIndex' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Compra actualizada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch {
        Swal.fire('Error', 'No se pudo actualizar la compra.', 'error')
      }
    }
  },
  mounted() {
    this.loadSuppliers()
    this.loadRawMaterials()
    this.loadPurchase()
  }
}
</script>
