import VueRouter from 'vue-router';

//components

// import Main from './components/Main.vue'
import Room from './components/Room.vue'


const routes = [
	{ 
		path: '/room', 
		component: Room 
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