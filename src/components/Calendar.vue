<template>
	<v-row style="margin: 0 !important; height: 92vh; maxHeight: 92vh;">
		<v-col class='col-3 element' style="backgroundColor:#453f54; maxHeight: inherit !important; overflow-y:auto !important;">
			<BookingUtil 
				@refreshBookings="getBookings()" 
			/>
		</v-col>
		<v-col class='col-9'>
			<v-row class="fill-height">
				<v-col>
					<v-sheet height="64">
						<v-toolbar
						flat
						>
						<v-btn
							outlined
							class="mr-4"
							color="grey darken-2"
							@click="setToday"
						>
							Today
						</v-btn>
						<v-btn
							fab
							text
							small
							color="grey darken-2"
							@click="prev"
						>
							<v-icon small>
							mdi-chevron-left
							</v-icon>
						</v-btn>
						<v-btn
							fab
							text
							small
							color="grey darken-2"
							@click="next"
						>
							<v-icon small>
							mdi-chevron-right
							</v-icon>
						</v-btn>
						<v-toolbar-title v-if="$refs.calendar">
							{{ $refs.calendar.title }}
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-menu
							bottom
							right
						>
							<template v-slot:activator="{ on, attrs }">
							<v-btn
								outlined
								color="grey darken-2"
								v-bind="attrs"
								v-on="on"
							>
								<span>{{ typeToLabel[type] }}</span>
								<v-icon right>
								mdi-menu-down
								</v-icon>
							</v-btn>
							</template>
							<v-list>
							<v-list-item @click="type = 'day'">
								<v-list-item-title>Day</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = 'week'">
								<v-list-item-title>Week</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = 'month'">
								<v-list-item-title>Month</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = '4day'">
								<v-list-item-title>4 days</v-list-item-title>
							</v-list-item>
							</v-list>
						</v-menu>
						</v-toolbar>
					</v-sheet>
					<v-sheet height="calc(100% - 64px)">
						<v-calendar
						ref="calendar"
						v-model="focus"
						color="primary"
						:events="events"
						:event-color="getEventColor"
						:type="type"
						@click:event="showEvent"
						@click:more="viewDay"
						@click:date="viewDay"
						
						></v-calendar>
						<v-menu
						v-model="selectedOpen"
						:close-on-content-click="false"
						:activator="selectedElement"
						>
						<v-card
							color="grey lighten-4"
							min-width="350px"
							flat
						>
							<v-toolbar
							:color="selectedEvent.color"
							dark
							>
								<v-toolbar-title v-if="selectedEvent.checkIn">
									<v-row align="center" justify="center">
										<v-col>
											{{ selectedEvent.details }} - {{ selectedEvent.customerName }}
										</v-col>
										<v-col  style="fontSize: 13px;">
											Check In:
												<span style="margin: auto 0 auto 5px;">{{ selectedEvent.checkIn.getMonth() + 1 }}/{{ selectedEvent.checkIn.getDate()}}</span>
										</v-col>
										<v-col style="fontSize: 13px;">
											Check Out:
											<span style="margin: auto 0 auto 5px;">{{ selectedEvent.checkOut.getMonth() + 1 }}/{{ selectedEvent.checkOut.getDate() }}</span>
										</v-col>
										<v-col>
											<v-btn 
												icon
												@click="openDeleteDialog(selectedEvent)"
											>
												<v-icon>fas fa-trash-alt</v-icon>
											</v-btn>	
										</v-col>
									</v-row>
								</v-toolbar-title>

							</v-toolbar>
							<v-card-text>
								<v-row>
									<v-col>
										<v-row >
											<v-col>
												<div style="font-size:15px"><b>Details</b></div>
												<div>
													<v-icon small>fas fa-hotel</v-icon> 
													<span style="margin: 0 0 0 5px;">Room - </span>
													<span style="margin: auto 0 auto 5px;"> {{ selectedEvent.roomName }}</span>
												</div>

												<div>
													<v-icon small>fas fa-users</v-icon>
													<span style="margin: 0 0 0 5px;"> Guests - </span>
													<span>{{ selectedEvent.numberOfGuests }}</span>
												</div>

												<div>
													<v-icon small>fas fa-moon</v-icon>
													<span style="margin: 0 0 0 5px;">Nights - </span>
													<span >{{ selectedEvent.numberOfNights }}</span>
												</div>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<div style="font-size:15px"><b>Add-ons</b></div>
												<div v-for="addOn in selectedEvent.addOns" :key="addOn.uuid">
													<span style="margin: auto 0 auto 5px;"> - {{ addOn.name }}</span>
												</div>
											</v-col>
										</v-row>
									</v-col>
								</v-row>
								<v-row>
									<v-col>
										<div>
											<v-icon x-small>fas fa-user</v-icon>
											<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerName }}</span>
										</div>
										<div>
											<v-icon x-small>fas fa-envelope</v-icon>
											<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerEmail }}</span>
										</div>
										<div>
											<v-icon x-small>fas fa-phone</v-icon>
											<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerPhoneNumber }}</span>
										</div>
									</v-col>
								</v-row>
							</v-card-text>
							<v-card-actions>
							<v-btn
								text
								color="secondary"
								@click="selectedOpen = false;"
							>
								Close
							</v-btn>
							</v-card-actions>
						</v-card>
						</v-menu>
					</v-sheet>
				</v-col>
			</v-row>

			<!-- delete booking modal -->
			<div class="modal" :class="{'is-active': deleteDialog}">
					<div class="modal-background">				
					</div>
					
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title"> Cancel Booking </p>
							<button class="delete" aria-label="close" @click="deleteDialog = false;"></button>
						</header>

						<section class="modal-card-body">
							<div>
								Are you sure you want to cancel the booking for <b>{{ bookingToDelete.customerName }}</b>?
							</div>
						</section>

						<footer class="modal-card-foot">
							<b-button 
								type="is-success"
								@click="deleteBooking()"
								:loading="deleteBookingLoading"
							>
								Confirm
							</b-button>
							<b-button
								type="is-danger"
								outlined
								@click="deleteDialog = false;"
							>
								Cancel
							</b-button>
						</footer>
					</div>
				</div>
		</v-col>
	</v-row>
</template>

<script>
import axios from 'axios';
import BookingUtil from './BookingUtil'
export default {
    data: () => ({
		today: new Date().toISOString().substring(0,10),
		focus: new Date().toISOString().substring(0,10),
		type: 'month',
		typeToLabel: {
			month: 'Month',
			week: 'Week',
			day: 'Day',
			'4day': '4 Days',
		},
		name: [],
		details: [],
		start: [],
		end: [],
		currentlyEditing: null,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [],
		bookingToDelete: {},
		deleteDialog: false,
		deleteBookingLoading: false,
		colors: 'blue'
    }),
	components : { BookingUtil },
    created () {
      this.getBookings();
    },
    methods: {
		async getBookings() {
			try {
				const { data } = await axios.get('http://localhost:3000/api/booking');

				this.events = data.bookings.map(booking => {
					return {
						uuid: booking.uuid,
						name: booking.customerDetails.name,
						details: 'Booking',
						start: booking.checkIn.substring(0,10),
						end: booking.checkOut.substring(0,10),
						checkIn: new Date(booking.checkIn),
						checkOut: new Date(booking.checkOut),
						color: booking.color,
						customerName: booking.customerDetails.name ? booking.customerDetails.name : 'N/A',
						customerPhoneNumber: booking.customerDetails.phoneNumber  ? booking.customerDetails.phoneNumber : 'N/A',
						customerEmail: booking.customerDetails.email ? booking.customerDetails.email : 'N/A',
						roomName: booking.room[0].name,
						addOns: booking.addOns,
						numberOfGuests: booking.numberOfGuests,
						numberOfNights: booking.numberOfNights
					}
				});
			} catch(error) {
				console.log(error)
			}
		},
		async deleteBooking() {
			try {
				await axios.delete(`http://localhost:3000/api/booking/cancel/${this.bookingToDelete.uuid}`);

				this.getBookings();

				this.deleteDialog = false;
			} catch(error) {
				console.log(error)
			}
		},
		openDeleteDialog(booking) {
			this.bookingToDelete = booking;
			this.deleteDialog = true; 
		},
		viewDay ({ date }) {
			this.focus = date
			this.type = 'day'
		},
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
		this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {

        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
		rnd (a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a
		},
    },
  }
</script>

<style>


.element::-webkit-scrollbar { width: 0 !important }

</style>