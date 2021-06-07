<template>
	<v-container>
		<v-row class="ma-0">
			<b-button
				class="mb-2"
				type="is-success"
				icon-left="fas fa-plus"
				small
				@click="toggleExpenseDialog()"
			>
				Add Expense
			</b-button>

			<b-button
				class="mb-2 ml-2"
				type=""
				icon-left="fas fa-clipboard"
				small
				@click="toggleExpenseTypeDialog()"
			>
				Expense Types
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
					<template v-slot:[`item.delete`]="{ item }">
						<v-btn
							fab
							dark
							small
							color="#e74f4f"
							@click="deleteExpense(item.uuid)"
						>
							<v-icon dark small>
								fas fa-trash
							</v-icon>
						</v-btn>
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


		<ExpenseType 
			v-if="expenseTypeDialog"
			@close="toggleExpenseTypeDialog"
		/>

	</v-container>
	
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CreateExpense from './CreateExpense';
import ExpenseType from './ExpenseType'

export default {
	name: 'Expenses',
	data() {
		return {
			expenseDialog: false,
			expenseTypeDialog: false,
			expenses: [],
			headers: [
				{
					text: 'Description',
					sortable: true,
					value: 'description',
					width: '23.3%'
				},
				{
					text: 'Type',
					sortable: true,
					value: 'type',
					width: '23.3%'
				},
				{
					text: 'Amount',
					sortable: true,
					value: 'amount',
					width: '23.3%'
				},
				{
					text: 'Date',
					sortable: true,
					value: 'date',
					formatter: this.dateFormat,
					width: '23.3%'
				},
				{
					text: 'Delete',
					value: 'delete',
					width: '10%',
					sortable: false,
				},
			],
		}
	},
	components: { CreateExpense, ExpenseType },
	props: ['roomTypeUuid'],
	methods: {
		async deleteExpense(uuid) {
			console.log(uuid)
		},
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
		toggleExpenseTypeDialog() {
			this.expenseTypeDialog = !this.expenseTypeDialog;
		}
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