import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  strict: false, 
  state: {
    // locale: 'en',
    // locales: ['en', 'ru', 'fr'],
    base_url: "https://api.exchangeratesapi.io/history",
    rates: [],
    history: {
      base: null,
      end_at: null,
      start_at: null
    },
    // rowsPerPageItems: [1, 2, 4, 8, 16, 32],
    items: [],
    choosen_rates: []
  },
  getters: {
  	getRates (state) {
  		return state.rates
  	},
    items (state) {
      return state.items
    },
    locale: state => state.locale,
  },
  mutations: {
  	SET_HEADERS(state, new_list) {
  		state.choosen_rates = new_list
  	},
    SET_ITEMS(state, new_list) {
      state.items = new_list
    },
  	SET(state, new_list) {
  		state.rates = new_list
  	},
    SET_HISTORY(state, res) {
      state.history = res
    },
    SET_LOCALE: (state, locale) => state.locale = locale,
  },
  actions: {
  	async loadRates ({state, commit}) {
  		let  response  = await axios.get('https://api.exchangeratesapi.io/latest')
  		let rates = response.data.rates;
  		
  		 let keys = Object.keys(rates);
            keys.push('EUR');
            keys.sort();
            console.log("loadRates(store)",keys); 
  		commit('SET', keys);
  		return response.data.rates
  	}
  }

})

export default store