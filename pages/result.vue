<template id="app">
	<div >
		<div v-if="$store.state.history.base">
			<div class="body-1 v-text-field pl-4 pb-2">
				<span class="font-weight-bold">{{ $t('common.base_rate') }}:</span>
				{{$store.state.history.base}}
			</div>
			<div class="body-1 v-text-field pl-4 pb-2">
				<span class="font-weight-bold">{{ $t('common.period') }}:</span>
				{{$store.state.history.start_at}}  {{ $t('common.divider') }}  {{$store.state.history.end_at}}
			</div>
		</div>
		<v-app>
		<v-data-table
	    :headers="$store.state.choosen_rates"
	    :items="$store.state.items"
	    class="elevation-1"
	    :pagination.sync="pagination"
	  	>
		  	<template slot="items" slot-scope="props" >
	      	<td class="text-xs-left" v-for="rate of $store.state.choosen_rates" :key="rate.value">
	      		{{ props.item[rate.value] }}
	      	</td>
	    	</template>
	    </v-data-table>
	  </v-app>
	</div>
</template>

<script >
// import Vue from 'vue'
// import Vuetify from 'vuetify'
 
// Vue.use(Vuetify)

export default {
	data() {
		return {
			pagination: {
			    rowsPerPage: 10
			},
		}
	}
}


</script>