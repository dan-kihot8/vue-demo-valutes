<template id="app">
	<div >
		<router-link to="/">Home</router-link>
		<v-app>
			<v-data-table
	    :headers="$store.state.choosen_rates"
	    :items="$store.state.items"
	    class="elevation-1"
	  	>
		  	<template slot="items" slot-scope="props" >
	      	<!-- <td class="text-xs-left" >{{ props.item.name }}</td> -->
	      	<td class="text-xs-left" v-for="rate of $store.state.choosen_rates" :key="rate">
	      		{{ props.item[rate.value] }}
	      	</td>
	    	</template>
	    </v-data-table>
	  </v-app>
	</div>
</template>

<script>
// import store from '../store'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
 
Vue.use(Vuetify)

export default {
	data() {
		return {}
	}
}


</script>