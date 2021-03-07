import VueRouter from 'vue-router';

//components

// import Main from './components/Main.vue'
import Room from './components/Room.vue'
import Calendar from './components/Calendar.vue';


const routes = [
	{ 
		path: '/', 
		redirect: '/dashboard' 
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