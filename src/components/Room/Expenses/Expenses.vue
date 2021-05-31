<template>
	<v-container>
		<v-row class="ma-0">
			<b-button
				type="is-success"
				icon-left="fas fa-plus"
				small
				@click="toggleExpenseDialog()"
			>
				Add Expense
			</b-button>
		</v-row>
		<v-row class="ma-0" >
			<v-col cols="12" class="pa-0">
				<v-data-table
					width="100%"
					dense
					:headers="headers"
					:items="expenses"
					:items-per-page="20"
					class="elevation-1"
				>
					<template v-slot:[`item.date`]="{ item }">
						<span>{{ item.date | formatDate }}</span>
					</template>
				</v-data-table>
			</v-col>
		</v-row>


		<CreateExpense 
			v-if="expenseDialog"
			:roomTypeUuid="roomTypeUuid"
			@close="toggleExpenseDialog"
			@refreshExpenses="getExpenses"
		/>

	</v-container>
	
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CreateExpense from './CreateExpense';

export default {
	name: 'Expenses',
	data() {
		return {
			expenseDialog: false,
			expenses: [],
			headers: [
				{
					text: 'Description',
					sortable: true,
					value: 'description',
				},
				{
					text: 'Type',
					sortable: true,
					value: 'type',
				},
				{
					text: 'Amount',
					sortable: true,
					value: 'amount',
				},
				{
					text: 'Date',
					sortable: true,
					value: 'date',
					formatter: this.dateFormat
				},
			],
		}
	},
	components: { CreateExpense },
	props: ['roomTypeUuid'],
	methods: {
		async getExpenses() {
			try {
				const { data } = await axios.get(`http://localhost:3000/api/expense/${this.roomTypeUuid}`);

				this.expenses = data;

				console.log(this.expenses)

			} catch(error) {
				console.log(error);
			}
		},
		toggleExpenseDialog() {
			this.expenseDialog = !this.expenseDialog;
		},
	},
	filters: {
		formatDate(date) {
			return moment(date).format("MM/DD/YYYY")
		}
	},
	created() {
		this.getExpenses();
	},
	watch: {
		roomTypeUuid() {
			this.getExpenses();
		}
	}
}
</script>

<style>


.text-start {
	padding: 5px 0 5px 5px !important;
}

</style>