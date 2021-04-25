import VueRouter from 'vue-router';

//components

// import Main from './components/Main.vue'
import Room from './components/Room/Room.vue'
import Calendar from './components/Calendar/Calendar.vue';
import Login from './components/Login/Login.vue';
import errorRoute from './components/404.vue';
import Dashboard from './components/Dashboard/Dashboard.vue'


const routes = [
	{ 
		path: '*', 
		component: errorRoute 
	},
	{ 
		path: '/404', 
		component: errorRoute,
		name: '404' 
	},
	{ 
		path: '/login/:company', 
		component: Login
	},
	{ 
		path: '/room', 
		component: Room,
		meta: {
			requiresAuth: true
		} 
	},
	{ 
		path: '/calendar', 
		component: Calendar,
		meta: {
			requiresAuth: true
		} 
	},
	{ 
		path: '/dashboard', 
		component: Dashboard,
		meta: {
			requiresAuth: true
		}  
	}
]


const router = new VueRouter({
	routes // short for `routes: routes`
});

export default router;