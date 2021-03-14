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
				>
					Create Booking
				</b-button>

			
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
			newBooking: {
				customerDetails: {
					customerName: null,
					customerEmail: null,
					customerNumber: null,
				},
				numberOfNights: 0,
				roomPrice: 0.00,
				addOnPrice: 0.00,
				totalPrice: 0.00,
				roomUuid: null
			}
		}
	},
	created(){
		this.getListings();
	},
	methods: {
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
				this.newBooking.roomPrice = listing.totalPrice
				this.newBooking.addOnPrice = addOnCosts
				this.newBooking.totalPrice = listing.totalPrice + addOnCosts
				this.newBooking.numberOfNights = listing.numberOfNights
				this.newBooking.listingsBooked = listing.listingsBooked
			}else {
				backgroundColor= '#c8b9f0'
			}

			return {
				'backgroundColor': backgroundColor ,
				margin: '5px 0 0 0',
				border: border
			}
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