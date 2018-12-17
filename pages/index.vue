<template>
  <section class="container">
	<div>
		<router-link to="/ru">Ru</router-link>
    <div class="links">
        <nuxt-link
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          style="padding: 0.5em"
          >
          <template v-if="locale.code !== $i18n.locale" >
          	{{ locale.name }}
          </template>
      	</nuxt-link>
    </div>
      <div>From Tranlation -  <b>{{ $t('common.test') }} </b></div>
      <v-app>
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center> 
          <v-flex xs12 sm6 d-flex>
            <v-select 
                v-model="baseRate"
                :items="$store.state.rates"
                label="The base rate ">
            </v-select>
          </v-flex>
        </v-layout>

        <span>Choose the rates to compare: </span>
        <input type="checkbox" 
          class="v-input--selection-controls__input"
          @click="selectAll($store.state.rates)" 
          v-model="allSelected"
        >
        <v-label class="v-label theme--light">Select all</v-label><br>
        <v-layout row wrap>
        <span v-for="rate in $store.state.rates" :key="rate">
          <v-flex xs12 sm4 md4>
          <v-checkbox 
            v-model="checkedScopes" 
            :label="rate" 
            :value="rate"
            color="indigo"
            hide-details
          ></v-checkbox>
          </v-flex>
        </span>
        </v-layout>
        <div>Choose date from: </div>
        <datepicker :disabledDates="disabledDates" v-model="date_from"></datepicker>
        <div>Choose date to: </div>
        <datepicker :disabledDates="disabledDates" v-model="date_to"></datepicker>
        <v-btn color="green" @click="getHistory($store)">Get history</v-btn>
        <v-alert
          v-model="alert.display"
          dismissible
          :type="alert.atype"
        >
        {{alert.value}}
        </v-alert>
        <v-btn 
          v-if="$store.state.history.rates!=undefined"
          color="yellow" 
          @click="showResult($store.state.history)"
        >
          Show history
        </v-btn>
      </v-container>
      </v-app>
	</div>
  </section>
</template>


<script>
import axios from 'axios'
import store from '~/store'
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker';
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import 'vuetify/dist/vuetify.min.css' 
 
Vue.use(Vuetify)
Vue.use(VueI18n)

console.log("MAINJS");
// var all_rates;
// store().dispatch("loadRates").then((res) => {
  // all_rates = res;
// });

export default {
	// async data () {
	//     let res = await axios.get('https://api.exchangeratesapi.io/latest')
	//     console.log("DATA",res);
	//     return { all_rates: res.data.res }
	//   },
    data () {
        return {
          checkedScopes: [],
          allSelected: false,
          // all_rates: all_rates,
          baseRate: 'EUR',
          date_from: new Date(2018, 9, 1),
          date_to: new Date(),
          disabledDates: {
              to: new Date(1999, 0, 1),
              from: new Date()
          },
          alert: {display: false,
          		  value: "success!",
          		  atype: "success"
          		}
        }
    },
    components: {
        Datepicker
    },
    methods: {
        selectAll: function(rates) {
            if (!this.allSelected) {
                this.checkedScopes=rates;
            }
            else {
                this.checkedScopes=[]
            }
        },      
        getHistory: function (store) {
        	let params = {};
        	params["base"]=this.baseRate;
        	params["start_at"]=formatDate(this.date_from);
        	params["end_at"]=formatDate(this.date_to);
        	let checkedScopes=clone(this.checkedScopes);
        	if ( checkedScopes.length == 0 ) {
        		this.alert={display: true,
		          		  value: "Please, select the rates!",
		          		  atype: "warning"
		          		};
		        return false
        	}
        	let indexBase = checkedScopes.indexOf(this.baseRate);
        	if (indexBase > -1) {
        		checkedScopes.splice( indexBase, 1 );
        	}
        	params["symbols"]=checkedScopes.toString();
        	let base_url=store.state.base_url;
        	axios.get(base_url, { params })
	        	.then((res) => {
	        			this.alert={display: true,
		          		  value: "success!",
		          		  atype: "success"
		          		};
	        			console.log("DATA",res.data);
	        			store.commit("SET_HISTORY", res.data)
	        			let table_headers = (checkedScopes).map(function(item) {
			              return {
			              	text: item,
			              	value: item,
			              	align: 'left'
			              }
			            });
			            table_headers.splice(0, 0, {text:"Date",
			            							value: 'name',
			            							align: 'left'
			            							}
			            );
			            let rates = res.data.rates;
			            let dates_array=Object.keys(rates);
			            let table_items = []
			            for (let key in rates) {
			            	let item=rates[key]
			            	item['name']=key
			            	table_items.push(item)
			            }

	        			store.commit("SET_HEADERS", table_headers);
	        			store.commit("SET_ITEMS", table_items);
	        	})
	        	.catch((e) => {
			      		this.alert={display: true,
		          		  value: e.toString(),
		          		  atype: "error"
		          		}
			    })
        },
        showResult: function(history) {
        	console.log(history);
        	this.$router.push("/result");
        }
    },
    fetch ({ store, params }) {
        return axios.get('https://api.exchangeratesapi.io/latest')
        .then((res) => {
        	console.log("runnin fetch in main.js");
            let rates = res.data.rates;
            let keys = Object.keys(rates);
            keys.push('EUR');
            keys.sort();
            store.commit('SET', keys)
            console.log('store', store);
        })
    },
    
}


function formatDate(date) {
	let y=date.getFullYear().toString()
	let m=(date.getMonth()+1).toString()
	let d=date.getDate().toString()
	return [y,m,d].join('-')
};

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

</script> 
