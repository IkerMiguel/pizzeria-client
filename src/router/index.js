import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Branches from '../views/Branches.vue'
import EditBranch from '../components/Branche/EditBranch.vue'
import NewBranch from '../components/Branche/NewBranch.vue'
import Suppliers from '../views/Suppliers.vue'
import EditSupplier from '../components/Supplier/EditSupplier.vue'
import NewSupplier from '../components/Supplier/NewSupplier.vue'
import Raw_material from '../views/Raw_material.vue'
import EditRawMaterial from '../components/Raw_material/EditRawMaterial.vue'
import NewRawMaterial from '../components/Raw_material/NewRawMaterial.vue'
import Purchases from '../views/Purchases.vue'
import PurchasesEdit from '../components/Purchase/PurchasesEdit.vue'
import PurchasesNew from '../components/Purchase/PurchasesNew.vue'
import Pizza_raw_materials from '../views/Pizza_raw_materials.vue'
import EditPizzaRawMaterial from '../components/Pizza_raw_material/EditPizzaRawMaterial.vue'
import NewPizzaRawMaterial from '../components/Pizza_raw_material/NewPizzaRawMaterial.vue'
import Order_extra_ingredients from '../views/Order_extra_ingredients.vue'
import EditOrderExtraIngredient from '../components/Order_extra_ingredient/EditOrderExtraIngredient.vue'
import NewOrderExtraIngredient from '../components/Order_extra_ingredient/NewOrderExtraIngredient.vue'
import Ingredient from '@/views/Ingredient.vue'
import EditIngredient from '@/components/Ingredient/EditIngredient.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
  path: '/branches',
  name: 'Branches',
  component: Branches
},
{
  path: '/editar-sucursal/:id',
  name: 'EditBranch',
  component: EditBranch
},
{
  path: '/add-sucursal',
  name: 'NewBranch',
  component: NewBranch
},

{
  path: '/suppliers',
  name: 'Suppliers',
  component: Suppliers
},
{
  path: '/editar-proveedor/:id',
  name: 'EditSupplier',
  component: EditSupplier
},
{
  path: '/add-proveedor',
  name: 'NewSupplier',
  component: NewSupplier
},

{
  path: '/raw-materials',
  name: 'Raw_material',
  component: Raw_material
},
{
  path: '/editar-materia-prima/:id',
  name: 'EditRawMaterial',
  component: EditRawMaterial
},
{
  path: '/add-materia-prima',
  name: 'NewRawMaterial',
  component: NewRawMaterial
},

{
  path: '/purchases',
  name: 'Purchases',
  component: Purchases
},
{
  path: '/editar-compra/:id',
  name: 'PurchasesEdit',
  component: PurchasesEdit
},
{
  path: '/add-compra',
  name: 'PurchasesNew',
  component: PurchasesNew
},

{
  path: '/pizza-raw-material',
  name: 'Pizza_raw_materials',
  component: Pizza_raw_materials
},
{
  path: '/editar-pizza-materia-prima/:id',
  name: 'EditPizzaRawMaterial',
  component: EditPizzaRawMaterial
},
{
  path: '/add-pizza-materia-prima',
  name: 'NewPizzaRawMaterial',
  component: NewPizzaRawMaterial
},

{
  path: '/order-extra-ingredient',
  name: 'Order_extra_ingredients',
  component: Order_extra_ingredients
},
{
  path: '/editar-pedido-ingrediente-extra/:id',
  name: 'EditOrderExtraIngredient',
  component: EditOrderExtraIngredient
},
{
  path: '/add-pedido-ingrediente-extra',
  name: 'NewOrderExtraIngredient',
  component: NewOrderExtraIngredient
},
{
  path: '/ingredients',
  name: 'Ingredient',
  component: Ingredient
},
{
  path: '/editIngredient/:id',
  name: 'EditIngredient',
  component: EditIngredient
}

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
