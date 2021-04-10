import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)


const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	key: 'admin-hms'
  })

const store = new Vuex.Store({
  state: {
	user: {
		loggedIn: false,
		token: null,
		company: {
			uuid: null,
			name: null
		}
	},
  },
  mutations: {
	updateAuth(state, data) {
		state.user = {
			...data,
			loggedIn: !!localStorage.getItem('token'),
			token: localStorage.getItem('token'),
		};
	},
	clearAuth(state) {
		state.user = {
			loggedIn: false,
			token: null,
			data: null,
			company: {
				uuid: null,
				name: null
			}
		}
	}
  },
  plugins: [vuexLocal.plugin]
})

export default store;