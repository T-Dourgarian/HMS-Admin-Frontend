import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import vuetify from '@/plugins/vuetify'

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.state.user.loggedIn) {
			next({ name: '404' })
		} else {
			next() // go to wherever I'm going
		}
	} else {
		next() // does not require auth, make sure to always call next()!
	}
})


Vue.config.productionTip = false;


Vue.use(VueRouter)
Vue.use(Buefy,
	{
		defaultIconPack: 'fas',
		defaultContainerElement: '#content',
	}
);

new Vue({
    render: h => h(App),
    vuetify,
    router,
	store
}).$mount('#app')
