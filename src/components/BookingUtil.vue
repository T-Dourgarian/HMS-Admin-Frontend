<template>
	<div >
		<b-tabs type="is-boxed" >
            <b-tab-item label="Create">
				
				<span style="color: #c8b9f0;" > Select a Date</span>
				<b-field >
					<b-datepicker
						placeholder="Click to select..."
						v-model="checkInOut"
						range					
					>
					</b-datepicker>
				</b-field>

				<span style="color: #c8b9f0;" ># of Guests</span>
				<b-input 
					v-model="newBooking.numberOfGuests" 
					custom-class="darkPurpleText purpleBackground" 
					placeholder="# of Guests"
				></b-input>

				<v-divider></v-divider>
				<span class="purpleText" >Select Listing and add-ons</span>
				<section v-if="listings[0]">
					<b-collapse
						:style="setBookingDetails(listing, index)" 
						class="card"
						animation="slide"
						v-for="(listing, index) of listings"
						:key="listing.uuid"
						:open="isOpen == index"
						@open="isOpen = index">
						<template #trigger="props">
							<div
								class="card-header"
								role="button"
							>
								<p class="card-header-title darkPurpleText" style="margin: 0">
									{{ listing.room[0].name }} - ${{ listing.room[0].basePrice }} / Night
								</p>
								<a class="card-header-icon">
									<b-icon
										class="darkPurpleText"
										:icon="props.open ? 'fas fa-angle-up' : 'fas fa-angle-down'">
									</b-icon>
								</a>
							</div>
						</template>
						<div class="card-content">
							<div class="content">
								<div v-for="addOn in listing.room[0].addOns" :key="addOn.uuid">
									<div>
										<b-checkbox 
											class="darkPurpleText"
											v-model="addOns"
											:native-value="addOn"
										>
											{{ addOn.name}}
											${{ addOn.cost}}
										</b-checkbox>
									</div>
								</div>
							</div>
						</div>
					</b-collapse>
				</section>


				<div style="margin: 15px 0 0 0;" class="purpleText">
					<div>
						Room: {{ newBooking.roomPrice ? '$' + newBooking.roomPrice.toFixed(2) : 'Select a room' }}
					</div>
					<div>
						Add-ons: ${{ newBooking.addOnPrice.toFixed(2) }}
					</div>
					<div>
						Total: ${{ newBooking.totalPrice.toFixed(2) }} for {{ newBooking.numberOfNights }} Nights
					</div>
				</div>

				<v-divider></v-divider>


				<div class="purpleText" style="margin: 10px 0 3px 0 !important;" >Name</div>
				<b-input 
					v-model="newBooking.customerDetails.customerName" 
					custom-class="darkPurpleText purpleBackground" 
					placeholder="Name"
				></b-input>

				<div class="purpleText" style="margin: 10px 0 3px 0 !important;" >Email</div>
				<b-input 
					v-model="newBooking.customerDetails.customerEmail" 
					custom-class="darkPurpleText purpleBackground" 
					placeholder="Email"
				></b-input>

				<div class="purpleText" style="margin: 10px 0 3px 0 !important;" >Phone Number</div>
				<b-input 
					v-model="newBooking.customerDetails.customerNumber" 
					custom-class="darkPurpleText purpleBackground" 
					placeholder="Phone Number"
					type="number"
				></b-input>

				<v-divider></v-divider>

				<b-button
					type="is-primary"
					expanded
					@click="bookingDialog = !bookingDialog"
					:loading="createBookingLoading"
				>
					Create Booking
				</b-button>


				<div class="modal" :class="{'is-active': bookingDialog}">
					<div class="modal-background">				
					</div>
					
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title"> Confirm Booking </p>
							<button class="delete" aria-label="close" @click="cancelBooking()"></button>
						</header>
						<section class="modal-card-body">
							
							
						</section>

						<footer class="modal-card-foot">
							<b-button 
								type="is-success"
								@click="createBooking()"
							>
								Confirm
							</b-button>
							<b-button
								type="is-danger"
								outlined
								@click="cancelBooking"
							>
								Cancel
							</b-button>
						</footer>
					</div>
				</div>

			
			</b-tab-item>
            <b-tab-item label="Search" icon="">
				searching bookings
			</b-tab-item>
        </b-tabs>
	</div>
</template>




<script>
		// 	checkIn,
		// 	checkOut,
import axios from 'axios';
import moment from 'moment';

export default {
	data() {
		return {
			tabs: ['Create','Search'],
			tab: null,
			checkInOut: [new Date(), new Date(moment().add(1, 'day'))],
			listings: [],
			addOns:[],
			isOpen: null,
			createBookingLoading: false,
			bookingDialog: false,
			newBooking: {
				customerDetails: {
					customerName: null,
					customerEmail: null,
					customerNumber: null,
				},
				numberOfGuests: null,
				numberOfNights: 0,
				roomPrice: 0.00,
				addOnPrice: 0.00,
				totalPrice: 0.00,
				roomUuid: null,
				checkIn: null,
				listingUuids: null,
				allDates: []
			}
		}
	},
	created(){
		this.getListings();
	},
	methods: {
		async createBooking() {
			try {
				if (this.newBooking.roomUuid) {
					this.createBookingLoading = true;

					let lastNight = new Date(this.newBooking.allDates[this.newBooking.allDates.length - 1]);
					let checkOut = new Date(this.newBooking.allDates[this.newBooking.allDates.length - 1])
					
					// await axios.post('http://localhost:3000/api/booking/create',
					// 	{
					// 		roomUuid: this.newBooking.roomUuid,
					// 		lastNight: lastNight,
					// 		checkIn: this.newBooking.checkIn,
					// 		checkOut: checkOut.setDate(lastNight.getDate() + 1),
					// 		numberOfNights: this.newBooking.allDates.length,
					// 		listingsBooked: this.newBooking.listingUuids,
					// 		roomPrice: this.newBooking.roomPrice,
					// 		addOnPrice: this.newBooking.addOnPrice,
					// 		totalPrice: this.newBooking.totalPrice,
					// 		numberOfGuests: 1, // not set up yet,
					// 		customerDetails: {
					// 			...this.newBooking.customerDetails
					// 		}
					// 	}
					// );

					console.log({
							roomUuid: this.newBooking.roomUuid,
							lastNight: lastNight,
							checkIn: this.newBooking.checkIn,
							checkOut: checkOut.setDate(lastNight.getDate() + 1),
							numberOfNights: this.newBooking.allDates.length,
							listingsBooked: this.newBooking.listingUuids,
							roomPrice: this.newBooking.roomPrice,
							addOnPrice: this.newBooking.addOnPrice,
							totalPrice: this.newBooking.totalPrice,
							numberOfGuests: 1, // not set up yet,
							customerDetails: {
								...this.newBooking.customerDetails
							}
						})



					this.createBookingLoading = false;
				} else {
					this.errorMsg = "You must fill the missing fields before booking";
				}

			} catch(error) {
				this.createBookingLoading = false;
				console.log(error);
			}
		},
		async getListings() {
			try {
				const { data } = await axios.get('http://localhost:3000/api/listing', {
					params: {
						checkIn: this.checkInOut[0].toISOString().split('T')[0],
						checkOut: this.checkInOut[1].toISOString().split('T')[0]
					}
				});
				this.listings = data;
				this.listingToBook = data[0];

				console.log(this.listings)


			} catch(error) {
				console.log(error);
			}
		},
		setBookingDetails(listing, index) {

			let backgroundColor;
			let border;

			if (index === this.isOpen) {
				backgroundColor = '#D3CAEE'
				border = '1px solid white'


				let addOnCosts = 0;
				
				this.addOns.forEach(addOn => {
					addOnCosts += addOn.cost
				});

				this.newBooking.roomUuid = listing.room[0].uuid;
				this.newBooking.roomPrice = listing.totalPrice;
				this.newBooking.addOnPrice = addOnCosts;
				this.newBooking.totalPrice = listing.totalPrice + addOnCosts;
				this.newBooking.numberOfNights = listing.numberOfNights;
				this.newBooking.listingsBooked = listing.listingsBooked;
				this.newBooking.allDates = listing.allDates;
				this.newBooking.checkIn = listing.checkIn;
				this.newBooking.listingUuids = listing.listingUuids;

			}else {
				backgroundColor = '#c8b9f0';
			}

			return {
				'backgroundColor': backgroundColor ,
				margin: '5px 0 0 0',
				border: border
			}
		},
		cancelBooking() {
			this.bookingDialog = false;
		}
	},
	watch: {
		checkInOut() {
			this.getListings();
		}
	}
}
</script>

<style>


.darkPurpleBackground {
	background: #453f54;
}


.darkPurpleText {
	color: #453f54;
}


.purpleText {
	color: #c8b9f0  !important;

}

.purpleBackground {
	background: #c8b9f0;
}

input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        display: none;
      }



</style>