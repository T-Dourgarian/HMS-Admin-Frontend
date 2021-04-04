<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Edit Booking</p>
				<button class="delete" aria-label="close" @click="closeEdit()"></button>
			</header>
			<section class="modal-card-body">
				
				
				<!-- customer details -->
				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col class="px-0 pt-0 ma-0"  cols="12">
						<b>Customer Details</b>
					</v-col>
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							Name:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-field>
							<b-input 
								v-model="bookingEdit.customerName"
								size="is-small"
								required
							></b-input>
						</b-field>
					</v-col>
				</v-row>

				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							Email:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-field>
							<b-input 
								v-model="bookingEdit.customerEmail"
								size="is-small"
								type="email"
								required
							></b-input>
						</b-field>
					</v-col>
				</v-row>

				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col cols="2" class="pa-0 ma-0">
						<div class="">
							Phone #:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-field>
							<b-input 
								v-model="bookingEdit.customerPhoneNumber"
								size="is-small"
								type="number"
							></b-input>
						</b-field>
					</v-col>
				</v-row>
				
				<!-- booking details -->


				<v-row class="px-0 pt-2 pb-2 ma-0" align="center">
					<v-col class="px-0 pt-0 ma-0"  cols="12">
						<b>Booking Details</b>
					</v-col>
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							Dates:
						</div>
					</v-col>
					<v-col class="pa-0 ma-0">
						<b-field >
							<b-datepicker
								placeholder="Click to select..."
								v-model="checkInOut"
								range					
							>
							</b-datepicker>
						</b-field>
					</v-col>
				</v-row>

				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							# Of Guests
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-field>
							<b-input 
								v-model="bookingEdit.numberOfGuests"
								size="is-small"
								type="number"
								required
							></b-input>
						</b-field>
					</v-col>
				</v-row>


				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							Room Type:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-select 
							placeholder="Select a Room" 
							v-model="bookingEdit.roomType"
							style="width:200px !important"
							@input="roomTypeUpdateHandler()"
						>
							<option
								v-for="roomType in roomTypes"
								:value="roomType"
								:key="roomType.uuid"
							>
								{{ roomType.name }}
							</option>
						</b-select>
					</v-col>
				</v-row>

				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							Room #:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-select 
							placeholder="Select a Room Number" 
							v-model="bookingEdit.room"
						>
							<option
								v-for="room in rooms"
								:value="room"
								:key="room.uuid">
								{{ room.roomNumber }}
							</option>
						</b-select>
					</v-col>
				</v-row>

				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col cols="2" class="pa-0 ma-0">
						<div class="inputLabel">
							Floor:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-field>
							<b-input 
								v-model="bookingEdit.floorNumber"
								size="is-small"
								type="number"
								required
							></b-input>
						</b-field>
					</v-col>
				</v-row>


				<v-row class="px-0 pt-0 pb-2 ma-0">
					<v-col>
						<v-row>
							<v-col cols="12" class="px-0 py-0 pb-2 ma-0">
								<b>Add-ons</b>
							</v-col>
							<v-col class="pa-0 ma-0">
								<div v-for="addOn in bookingEdit.roomType.addOns" :key="addOn.uuid">
									<div>
										<b-checkbox 
											v-model="bookingEdit.addOns"
											:native-value="addOn"
										>
											{{ addOn.name }} ${{ addOn.cost }}
										</b-checkbox>
									</div>
								</div>
							</v-col>
						</v-row>
					</v-col>
					<v-col>
							<v-row>
							<v-col cols="12" class="px-0 py-0 pb-2 ma-0">
								<b>Original add-ons</b>
							</v-col>
							<v-col class="pa-0 ma-0">
								<div v-for="addOn in booking.addOns" :key="addOn.uuid">
									<div>
										{{ addOn.name }} ${{ addOn.cost }}
									</div>
								</div>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-divider></v-divider>

				<v-row class="px-0 pt-0 pb-2 ma-0" align="center">
					<v-col class="pa-0 ma-0">
						<div class="inputLabel">
							Room: <b>${{ this.roomPrice.toFixed(2) }}</b>
						</div>
						
						<div class="inputLabel">
							Add-ons: <b>${{ this.addOnCosts.toFixed(2) }}</b>
						</div>

						<div class="inputLabel">
							Total: <b>${{ (this.addOnCosts + this.roomPrice).toFixed(2) }}</b>
						</div>
					</v-col>
				</v-row>

			</section>

			<footer class="modal-card-foot">
				<button 
					class="button is-success"
					@click="saveEdit()"
				>
					Save Changes
				</button>
				<button 
					class="button"
					@click="closeEdit()"
					:loading="updateButtonLoading"
				>
					Cancel
				</button>
			</footer>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	data() {
		return {
			bookingEdit: {},
			checkInOut: [],
			roomTypes: [],
			rooms: [],
			roomsAll: [],
			updateButtonLoading: false
		}
	},
	props: [ 'booking' ],
	methods: {
		async getRoomTypes() {
			try {
				
				const { data } = await axios.get('http://localhost:3000/api/room/listings',{
					params: {
						checkIn: this.checkInOut[0],
						checkOut: this.checkInOut[1],
						bookingUuid: this.bookingEdit.uuid
					}
				});

				// console.log(data)

				this.roomTypes = data.roomTypes;
				this.rooms = data.rooms;
				this.roomsAll = data.rooms

			}catch(error) {
				console.log(error);
			}
		},
		async saveEdit() {
			try {

				this.updateButtonLoading = true;

				if (
					this.checkInputsFilled
				) {
					let updateObj = {
						customerDetails: {
							name: this.bookingEdit.customerName,
							email: this.bookingEdit.customerEmail,
							phoneNumber: this.bookingEdit.customerPhoneNumber
						},
						addOns: this.bookingEdit.addOns,
						roomUuid: this.bookingEdit.room.uuid,
						roomTypeUuid: this.bookingEdit.roomType.uuid,
						checkIn: this.checkInOut[0],
						checkOut: this.checkInOut[1],
						numberOfNights: this.numDays(this.checkInOut[0], this.checkInOut[1]),
						roomPrice: this.roomPrice.toFixed(2),
						addOnPrice: this.addOnCosts.toFixed(2),
						totalPrice: (this.addOnCosts + this.roomPrice).toFixed(2),
						numberOfGuests: this.bookingEdit.numberOfGuests
					}

					await axios.put(`http://localhost:3000/api/booking/update/${ this.bookingEdit.uuid }`, updateObj);

					this.$buefy.toast.open({
						duration: 2500,
						message: `Update Successful`,
						position: 'is-bottom',
						type: 'is-success'
					})


					this.$emit('refresh');
					this.closeEdit()

				} else {

					this.$buefy.toast.open({
						duration: 2500,
						message: `Update Unsuccessful - All inputs are required.`,
						position: 'is-bottom',
						type: 'is-danger'
					})
				}

				this.updateButtonLoading = false;

			}catch(error) {
				this.updateButtonLoading = false;
				this.$buefy.toast.open({
                    duration: 2500,
                    message: `Update Unsuccessful - An error has occurred.`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
				console.log(error);
			}
		},
		closeEdit() {
			this.$emit('close');
		},
		moment: function (date) {
			return moment(date);
		},
		numDays(day1, day2) {

			const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

			const diffDays = Math.round(Math.abs((day1 - day2) / oneDay));


			return diffDays;
		},
		roomTypeUpdateHandler() {
			this.rooms = this.roomsAll.filter(room => {
				return room.roomTypeUuid == this.bookingEdit.roomType.uuid
			});

			this.bookingEdit.addOns = [];
		}
	},
	computed: {
		roomPrice() {

			const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

			const diffDays = Math.round(Math.abs((this.checkInOut[0] - this.checkInOut[1]) / oneDay));


			return this.bookingEdit.roomType.basePrice * diffDays;
		},
		addOnCosts() {
			let addOnTotal = 0;

			this.bookingEdit.addOns.forEach(addOn => {
				addOnTotal += addOn.cost
			});

			return addOnTotal;
		},
		checkInputsFilled() {

			let b = this.bookingEdit;

			return b.customerName &&
				b.customerEmail &&
				b.customerPhoneNumber &&
				b.room.uuid &&
				b.roomType.uuid &&
				b.numberOfGuests &&
				this.checkInOut[0] &&
				this.checkInOut[1]
		}
	},
	created() {

		this.bookingEdit = JSON.parse(JSON.stringify(this.booking));
		this.checkInOut = [ this.booking.checkIn, this.booking.checkOut ]
	},
	watch: {
		checkInOut() {
			this.getRoomTypes();
		}
	}
}
</script>

<style scoped>

.inputLabel {
	font-size: 15px;
}

</style>