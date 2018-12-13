import axios from 'axios'
import store from './store'
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
 
Vue.use(Vuetify)

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
	        			store.commit("SAVE_RESULT", res.data)
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
            let rates = res.data.rates;
            let keys = Object.keys(rates);
            keys.push('EUR');
            keys.sort();
            store.commit('SET', keys)
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
