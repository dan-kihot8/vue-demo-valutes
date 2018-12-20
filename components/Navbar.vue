<template>
  <div >
    <nav class="pa-3 white navbar v-toolbar elevation-2 light" >
    	<div class="links">
    		<nuxt-link to="/">Home</nuxt-link>
    	</div>
      <div class="links right">
        <nuxt-link
          v-for="(locale, index) in $i18n.locales"
          :key="index"
          :exact="true"
          :to="switchLocalePath(locale.code)"
          style="padding: 0.5em"
          >
          <template v-if="locale.code !== $i18n.locale" >
          	{{ locale.name }}
          </template>
      	</nuxt-link>
   	 	</div>
      <v-spacer></v-spacer>
      
    </nav>
  </div>
</template>


<script lang="ts">
export default {
  // name: 'Navbar'
}
</script>

