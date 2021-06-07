<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Manage Expense Types</p>
				<button class="delete" aria-label="close" @click="close()"></button>
			</header>
			<section class="modal-card-body">
				<v-row class="ma-0">
					<v-col class="py-0">
						<b>Type</b>
					</v-col>
				</v-row>

				<v-row class="ma-0">
					<v-col>
						<b-input v-model="type"></b-input>
					</v-col>

					<v-col>
						<b-button
							class="mb-2"
							type="is-success"
							icon-left="fas fa-plus"
							small
							@click="createType()"
						>
							Add Expense
						</b-button>
					</v-col>
				</v-row>

				<v-divider></v-divider>


				<v-row class="ma-0">
					<v-col>
						<div v-for="type of types" :key="type.uuid">
							{{ type.type }}
						</div>
					</v-col>
				</v-row>
			

			</section>

			<footer class="modal-card-foot">
				<button 
					class="button"
					@click="close()"
				>
					Close
				</button>
			</footer>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			type: null,
			types: []
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},
		async getTypes() {
			try {
				const { data } = await axios.get(`http://localhost:3000/api/expense/type/${this.$store.state.user.company.uuid}`);

				this.types = data;

			} catch(error) {
				console.log(error)
			}
		},
		async createType() {
			try {
				

				if (this.type) {
					await axios.post('http://localhost:3000/api/expense/create/type' ,
						{
							companyUuid: this.$store.state.user.company.uuid,
							type: this.type
						}
					);
				} else {
					console.log('no type inputted')
				}

				this.type = '';

				this.getTypes();

			} catch(error) {
				console.log(error)
			}

		},
		deleteType() {},
	},
	created() {
		this.getTypes();
	}
}
</script>

<style>

</style>