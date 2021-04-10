<template>
	<v-row class="ma-0">
		<v-col cols='12'>
				<b>{{ company.name }}</b>
		</v-col>
		<v-col cols='12'>
				<b-field label="username">
					<b-input
						v-model="username"
					>
					</b-input>
				</b-field>
		</v-col>
		<v-col cols='12'>
				<b-field label="Password">
					<b-input
					type="password"
						v-model="password"
						password-reveal
					>
					</b-input>
				</b-field>
		</v-col>
		<v-col cols='2'>
				<b-button
					type="is-success"
					@click="login()"
				>
					Login
				</b-button>
		</v-col>
	</v-row>
</template>

<script>
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default {
	data() {
		return {
			username: '',
			password: '',
			company: {
				uuid: null,
				name: null
			}
		}
	},
	methods: {
		async login() {
			try {
				const { data: token } = await axios.post('http://localhost:3000/api/user/login', 
				{
					username: this.username, 
					password: this.password, 
					companyUuid: this.company.uuid
				});

				localStorage.token = token;
				let userData = jwt.decode(token);


				this.$store.commit('updateAuth', userData);

				this.$router.push('/dashboard');


			} catch(error) {
				console.log(error);
			}
		},
		async getCompany() {
			try {
				let { data } = await axios.get(`http://localhost:3000/api/company/${this.$route.params.company}`);

				this.company = data;


			} catch(error) {
				this.$router.push('/404');
			}
		}
	},
	created() {
		if (this.$store.state.user.loggedIn) {
			this.$router.push('/dashboard');
		} else {
			this.getCompany();			
		}
	}
}
</script>

<style>

</style>