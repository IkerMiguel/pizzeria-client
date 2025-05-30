<template>
  <nav>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/branches">Sucursales</router-link>
  <router-link to="/suppliers">Proveedores</router-link> |
  <router-link to="/raw-materials">Materias Primas</router-link> |
  <br>
  <router-link to="/purchases">Compras</router-link> |
  <router-link to="/pizza-raw-material">Pizza Materia Prima</router-link> |
  <router-link to="/order-extra-ingredient">Pedido Ingrediente Extra</router-link> |
  <router-link to="/Ingredients">Ingredientes</router-link> |
  <br>
  <router-link to="/pizza-ingredient">Ingrediente para pizza</router-link> |
</nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
