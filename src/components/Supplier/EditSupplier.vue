<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Proveedor</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Proveedor
      </div>
      <div class="card-body">
        <form @submit.prevent="updateSupplier">

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="name" placeholder="Nombre del proveedor"
                     v-model="supplier.name" />
            </div>
          </div>

          <div class="row mb-3">
            <label for="contact_info" class="form-label">Información de Contacto</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="phone" /></div>
              <input type="text" class="form-control" id="contact_info" placeholder="Contacto"
                     v-model="supplier.contact_info" />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
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
  name: 'EditarProveedor',
  data() {
    return {
      supplier: {
        id: 0,
        name: '',
        contact_info: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Proveedores' })
    },
    async updateSupplier() {
      const res = await axios.put(`http://127.0.0.1:8000/api/suppliers/${this.supplier.id}`, this.supplier)
      if (res.status === 200) {
        this.$router.push({ name: 'Suppliers' })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proveedor actualizado exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  },
  mounted() {
    this.supplier.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/suppliers/${this.supplier.id}`)
      .then(response => {
        this.supplier = response.data.supplier
      })
  }
}
</script>
