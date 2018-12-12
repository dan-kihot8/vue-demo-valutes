import axios from 'axios'
import store from './store'
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker';

var all_rates;
// store().dispatch("loadRates").then((res) => {
//   all_rates = res;
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
        selectAll: function() {
            console.log(this);
            if (!this.allSelected) {
                this.checkedScopes=all_rates
            }
            else {
                this.checkedScopes=[]
            }
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
            all_rates=keys
            console.log(keys);
            store.commit('SET', keys)
        })
    },
    
}