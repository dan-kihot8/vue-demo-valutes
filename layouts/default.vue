<template>
  <div class="app">
    <div class="main">
      <navbar/>
      <nuxt/>
    </div>
  </div>
</template>


<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar  
}
}
</script>