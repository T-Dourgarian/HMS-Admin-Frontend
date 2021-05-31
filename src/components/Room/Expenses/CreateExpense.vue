<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Create Expense</p>
				<button class="delete" aria-label="close" @click="close()"></button>
			</header>
			<section class="modal-card-body">
				
				<v-row class="ma-0">
						
					<v-col>
						<v-row align="center">
							<v-col cols="12" >
								<b-input 
									v-model="description"
									placeholder="Description"
								></b-input>
							</v-col>

							<v-col cols="12" >
								<b-input 
									v-model="type"
									placeholder="Type"
								></b-input>
							</v-col>

							<v-col cols="12" >
								<b-input 
									v-model="amount"
									placeholder="Amount"
									type="Number"
								></b-input>
							</v-col>

							<v-col cols="12" >
								<b-input 
									v-model="date"
									placeholder="Date"
									type="date"
								></b-input>
							</v-col>
						
						</v-row>

						<!-- <div style="fontSize:13px"> {{ this.addOnErrorMsg }}</div> -->
						

					</v-col>
				</v-row>
			</section>

			<footer class="modal-card-foot">

				<b-button 
					class="button"
					@click="createExpense()"
					type="is-success"
				>
					Create
				</b-button>

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
			description: null,
			type: null,
			amount: null,
			date: null,
		}
	},
	props: ['roomTypeUuid'],
	methods: {
		close() {
			this.$emit('close');
		},
		async createExpense() {
			try {
				await axios.post('http://localhost:3000/api/expense/create',
					{
						description: this.description,
						type: this.type,
						amount: this.amount,
						date: this.date,
						roomTypeUuid: this.roomTypeUuid
					}
				);

				this.$emit('refreshExpenses');
				this.$emit('close');

			} catch(error) {
				console.log(error);
			}
		}
	}
}
</script>

<style>

</style>