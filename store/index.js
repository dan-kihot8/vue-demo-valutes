import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  strict: false, 
  state: {
    base_url: "https://api.exchangeratesapi.io/history",
    rates: [],
    history: {
      base: null,
      end_at: null,
      start_at: null
    },
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 8,
      sortBy: 'name',
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16, 32]
    },
    rowsPerPageItems: [1, 2, 4, 8, 16, 32],
    items: [],
    choosen_rates: []
  },
  getters: {
  	getRates (state) {
  		return state.rates
  	},
    pagination (state) {
      return state.pagination
    },
    items (state) {
      return state.items
    }
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
    SAVE_RESULT(state, res) {
      state.history = res
    },
    setPagination (state, payload) {
      state.pagination = payload
    },
    _setItems (state, { items, totalItems }) {
      state.items = items
      Vue.set(state.pagination, 'totalItems', totalItems)
    }
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
  	},
    queryItems (context) {

      return new Promise((resolve, reject) => {

        const { sortBy, descending, page, rowsPerPage } = context.state.pagination

        setTimeout(() => {

          let items = context.state.items
          const totalItems = items.length

          if (sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          context.commit('_setItems', { items, totalItems })

          resolve()
        }, 1000)
      })
    }
  }

})

export default store