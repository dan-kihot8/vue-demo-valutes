import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    base_url: "https://api.exchangeratesapi.io/history?",
    rates: [],
    history: {}
  },
  getters: {
  	getRates (state) {
  		return state.rates
  	}
  },
  mutations: {
  	ADD(state, new_item) {
  		state.choosen_rates.push(new_item)
  	},
  	SET(state, new_list) {
  		state.rates = new_list
  	},
    SAVE_RESULT(state, res) {
      state.history = res
    }
  }
  ,
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
  	},
  	// async getRates ({ commit }) {
   //    const ip = await axios.get('http://icanhazip.com')
   //    commit('SET_IP', ip)
   //    console.log(ip);
   //  }
  }
})

export default store