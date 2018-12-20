<template>
  <section class="container">
  	<v-app light>
	<div>
    
      <div>{{ $t('index.header') }}</div>
      
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center> 
          <v-flex xs12 sm6 d-flex>
            <v-select 
                v-model="baseRate"
                :items="$store.state.rates"
                :label="$t('common.base_rate')"
            >
            </v-select>
          </v-flex>
        </v-layout>

        <div class="pb-2">{{ $t('index.compare') }}:</div>
        <input type="checkbox" 
          class="v-input--selection-controls__input v-icon"
          @click="selectAll($store.state.rates)" 
          v-model="allSelected"
        >
        <v-label class="v-label theme--light">{{ $t('index.select') }}</v-label><br>
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
        <div >{{ $t('index.ch_date_from') }}:</div>
        <datepicker class="pa-1 pl-3" :disabledDates="disabledDates" v-model="date_from"></datepicker>
        <div>{{ $t('index.ch_date_to') }}:</div>
        <datepicker class="pa-1 pl-3" :disabledDates="disabledDates" v-model="date_to"></datepicker>
        <v-btn color="green" 
        	@click="getHistory($store, $t('index.warning'), $t('index.success'))">
        	{{ $t('index.get_history') }}
        </v-btn>
        <v-btn 
          v-if="$store.state.history.rates!=undefined"
          color="yellow" 
          @click="showResult($store.state.history, $i18n.locale)"
        >
          {{ $t('index.show_history') }}
        </v-btn>
        <v-alert
          v-model="alert.display"
          dismissible
          :type="alert.atype"
          class="black--text"
        >
        {{alert.value}}
        </v-alert>
        
      </v-container>
      
	</div>
	</v-app>
  </section>
</template>



<script>
import axios from 'axios'
import store from '~/store'
import Datepicker from 'vuejs-datepicker';

export default {
	// async fetch({store, params}) {
 //    try {
 //    	let response  = await axios.get('rates.json');
	//     if (response.status === 200) {
	//         let rates = response.data.rates;
	//   		// let keys = Object.keys(rates);
	//         rates.sort();
	//         console.log("loadRates(json)",rates); 
	//   		store.commit('SET', rates);
	//     }
 //    } catch (error) {
 //      console.error("ERR!",error)
 //    }
 //  },
    data () {
        return {
          checkedScopes: [],
          allSelected: false,
          baseRate: 'EUR',
          date_from: new Date(2018, 9, 1),
          date_to: new Date(),
          disabledDates: {
              to: new Date(1999, 0, 1),
              from: new Date()
          },
          alert: {display: false,
          		  value: "",
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
        getHistory: function (store, warning_text, success_text) {
        	let params = {};
        	params["base"]=this.baseRate;
        	params["start_at"]=formatDate(this.date_from);
        	params["end_at"]=formatDate(this.date_to);
        	let checkedScopes=clone(this.checkedScopes);
        	if ( checkedScopes.length == 0 ) {
        		this.alert={display: true,
		          		  value: warning_text,
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
		          		  value: success_text,
		          		  atype: "success"
		          		};
	        			// console.log("DATA",res.data);
	        			store.commit("SET_HISTORY", res.data)
	        			let table_headers = (checkedScopes).map(function(item) {
			              return {
			              	text: item,
			              	value: item,
			              	align: 'left',
			              	sortable: false
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
        showResult: function(history, locale) {
        	// console.log(history);
        	this.$router.push(locale + "/result");
        }
    }    
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
