import VueRouter from 'vue-router';

//components

// import Main from './components/Main.vue'
import Room from './components/Room/Room.vue'
import Calendar from './components/Calendar/Calendar.vue';
import Login from './components/Login/Login.vue';
import errorRoute from './components/404.vue';


const routes = [
	{ 
		path: '*', 
		component: errorRoute 
	},
	{ 
		path: '/login/:company', 
		component: Login
	},
	{ 
		path: '/room', 
		component: Room 
	},
	{ 
		path: '/calendar', 
		component: Calendar 
	},
    // { 
	// 	path: '/balances', 
	// 	component: Balances,
	// 	meta: {
	// 		requiresAuth: true
	// 	} 
	// },
	
]


const router = new VueRouter({
	routes // short for `routes: routes`
})

export default router;