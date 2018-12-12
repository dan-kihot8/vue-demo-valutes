import axios from 'axios'
import store from './store'
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker';

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
          }
        }
    },
    components: {
        Datepicker
    },
    methods: {
        selectAll: function(rates) {
            // console.log(e);
            if (!this.allSelected) {
                this.checkedScopes=rates
            }
            else {
                this.checkedScopes=[]
            }
        },
        
        getHistory: function () {
        	let params = {};
        	params["base"]=this.baseRate;
        	params["start_at"]=formatDate(this.date_from);
        	params["end_at"]=formatDate(this.date_to);
        	let checkedScopes=this.checkedScopes;
        	let indexBase = checkedScopes.indexOf(this.baseRate);
        	if (indexBase > -1) {
        		checkedScopes.splice( indexBase, 1 );
        	}
        	params["symbols"]=checkedScopes.toString();
        	// console.log(params);
        	let base_url=store().state.base_url;
        	axios.get(base_url, { params })
	        	.then((res) => {
	        			alert("Success!")
	        			console.log("DATA",res.data);	
	        	})
	        	.catch((e) => {
			      alert(e.toString() )
			    })
        }
    },
    fetch ({ store, params }) {
        return axios.get('https://api.exchangeratesapi.io/latest')
        .then((res) => {
            let rates = res.data.rates;
            // store.commit('SET', new_array)
            // var new_array = Object.keys(rates).map(function(item) {
            //     console.log(item);
            //   return item;
            // });
            // rates['EUR']=1;
            
            let keys = Object.keys(rates);
            keys.push('EUR');
            keys.sort();
            // all_rates=keys
            console.log("fetch",keys);
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
