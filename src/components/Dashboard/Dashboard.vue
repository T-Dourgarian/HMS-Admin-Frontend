<template>
	<v-row class="ma-0" style="height: 92vh; maxHeight: 92vh; margin: 0 !important;">
		<v-col cols="12">

			<b>Today's Bookings</b>
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

					<b-table-column  label="Room No." width="40" v-slot="props">
						{{ props.row.room[0].roomNumber }}
					</b-table-column>

					<b-table-column  label="Checked In" width="40" v-slot="props">
						{{ props.row.checkedInDate ? props.row.checkedInDate : 'N/A'}}
					</b-table-column>


					<b-table-column  label="Checked Out" width="40" v-slot="props">
						{{ props.row.checkedOutDate ? props.row.checkedOutDate : 'N/A'}}
					</b-table-column>

					<b-table-column  label="Action" width="40" v-slot="props">
						<div v-if="!props.row.checkedIn">
							<b-button
								@click="openCheckInOutDialog(props.row)"
							>
								Check In
							</b-button>
						</div>

						<div v-else-if="!props.row.checkedOut">
							<b-button 
								@click="openCheckInOutDialog(props.row)"
							>
								Check Out
							</b-button>
						</div>

						<div v-else>
							Checked Out
						</div>

					</b-table-column>

<!-- 					

					<b-table-column label="Gender" v-slot="props">
						<span>
							<b-icon pack="fas"
								:icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
							</b-icon>
							{{ props.row.gender }}
						</span>
					</b-table-column> -->

				</b-table>

				<div class="modal" v-if="checkInOutDialog && checkInOutBooking" :class="{'is-active': checkInOutDialog }">
					<div class="modal-background">				
					</div>
					
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title"> Confirm Check {{ checkInOutBooking.checkedIn ? 'Out' : 'In' }} </p>
							<button class="delete" aria-label="close" @click="checkInOutDialog = false"></button>
						</header>
						<section class="modal-card-body">

							<h1>Confirm Details</h1>

							<div>
								{{ checkInOutBooking.customerDetails.name }}
							</div>

							<div>
								{{ checkInOutBooking.customerDetails.email }}
							</div>
							
							<div>
								{{ checkInOutBooking.customerDetails.phoneNumber }}
							</div>
							
						</section>

						<footer class="modal-card-foot">
							<b-button 
								type="is-success"
								@click="checkInOut(checkInOutBooking.uuid)"
							>
								Check {{ checkInOutBooking.checkedIn ? 'Out' : 'In' }}
							</b-button>
							<b-button
								type="is-danger"
								outlined
								@click="checkInOutDialog = false"
							>
								Cancel
							</b-button>
						</footer>
					</div>
				</div>
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
			filterOption: 'all',
			checkInOutDialog: false,
			checkInOutBooking: null
		}
	},
	methods: {
		async getBookings() {
			try {
				const { data } = await axios.get(`http://localhost:3000/api/booking/${this.$store.state.user.company.uuid}`, {
					params: {
						today: true
					}
				});

				this.bookings = data.bookings;

				console.log('data', data.bookings);
			} catch(error) {
				console.log(error)
			}
		},
		async checkInOut(uuid) {

			try {
				await axios.put(`http://localhost:3000/api/booking/checkinout/${uuid}`, {
					date: moment().format('YYYY-MM-DD HH:mm a')
				});


				this.getBookings();

			} catch(error) {
				error
			}
		},
		openCheckInOutDialog(booking) {
			this.checkInOutBooking = booking;
			this.checkInOutDialog = true;
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