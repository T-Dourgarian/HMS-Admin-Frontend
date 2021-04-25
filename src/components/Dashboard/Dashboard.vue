<template>
	<v-row>
		<v-col cols="12">
			Today's bookings 
		</v-col>
		<v-col cols="12">
			<section>

				<b-field label="Filter">
					<b-select
						v-model="filterOption"
					>
						<option
							v-for="option in filterOptions"
							:value="option"
							:key="option"
							
							>
							{{ option }}
						</option>
					</b-select>
				</b-field>

				<b-table
					:data="bookings"
				>

					<b-table-column  label="Name" width="40" v-slot="props">
						{{ props.row.customerDetails.name }}
					</b-table-column>

					<b-table-column  label="Check In" width="40" v-slot="props">
						{{ props.row.checkIn }}
					</b-table-column>

					<b-table-column  label="Check Out" width="40" v-slot="props">
						{{ props.row.checkOut }}
					</b-table-column>

					<b-table-column  label="Room Type" width="40" v-slot="props">
						{{ props.row.roomType[0].name }}
					</b-table-column>

					<b-table-column  label="Room Number" width="40" v-slot="props">
						{{ props.row.room[0].roomNumber }}
					</b-table-column>

					<b-table-column  label="Action" width="40" v-slot="props">
						<div v-if="isToday(props.row.checkIn)">
							checkin
						</div>

						<div v-else-if="isToday(props.row.checkOut)">
							checkOut
						</div>

						<div v-else>
							asdf
						</div>
					</b-table-column>

					<!-- <b-table-column field="user.first_name" label="First Name" sortable v-slot="props">
						{{ props.row.user.first_name }}
					</b-table-column>

					<b-table-column field="user.last_name" label="Last Name" sortable v-slot="props">
						{{ props.row.user.last_name }}
					</b-table-column>

					<b-table-column field="date" label="Date" sortable centered v-slot="props">
						<span class="tag is-success">
							{{ new Date(props.row.date).toLocaleDateString() }}
						</span>
					</b-table-column>

					<b-table-column label="Gender" v-slot="props">
						<span>
							<b-icon pack="fas"
								:icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
							</b-icon>
							{{ props.row.gender }}
						</span>
					</b-table-column> -->

				</b-table>
			</section>
		</v-col>
	</v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
	data() {
		return {
			bookings: [],
			filterOptions: ['all', 'check in', 'check out'],
			filterOption: 'all'
		}
	},
	methods: {
		async getBookings() {
			const { data } = await axios.get(`http://localhost:3000/api/booking/${this.$store.state.user.company.uuid}`, {
				params: {
					today: true
				}
			});

			this.bookings = data.bookings;

			console.log('data', data.bookings);
		},
		isToday(d1) {

			let day1 = moment(d1.split('T')[0]);

			let today = moment();

			return day1.date() === today.date() &&
				day1.month() === today.month() &&
				day1.year() === today.year();
		}
	},
	created() {
		this.getBookings();
	}
}
</script>

<style>

</style>