<template>
  <main>
    <div id="resto">
      <h1>Liste des restaurants</h1>

      <Restaurants />
      
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Restaurants from '@/components/Restaurants.vue'

export default {
  name: 'resto',
  components: {
    Restaurants
}
}
</script>
