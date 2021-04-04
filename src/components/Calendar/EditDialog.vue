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
								type="Number"
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
							Room Type:
						</div>
					</v-col>
					<v-col cols="10" class="pa-0 ma-0">
						<b-select 
							placeholder="Select a Room" 
							v-model="bookingEdit.roomType"
							style="width:200px !important"
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
								type="email"
								required
							></b-input>
						</b-field>
					</v-col>
				</v-row>
			
				<!-- <v-row>
					<v-col>
						<span style="font-weight:600">Add-ons</span>
						<div v-for="addOn in addOns" :key="addOn.uuid">
							<div>
								<b-checkbox 
									v-model="room.addOns"
									:native-value="addOn"
								>
									{{ addOn.name }} ${{ addOn.cost }}
								</b-checkbox>
							</div>
						</div>
					</v-col>
				</v-row> -->
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
				>
					Cancel
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
			bookingEdit: {},
			checkInOut: [],
			roomTypes: [],
			selectRoomType: {},
			selectRoom: {},
			rooms: [],
			roomsAll: [],
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


				console.log(data)

				this.roomTypes = data.roomTypes;
				this.rooms = data.rooms;
				this.roomsAll = data.rooms


			}catch(error) {
				console.log(error);
			}
		},
		getRooms() {
			try {
				console.log('here');
			}catch(error) {
				console.log(error);
			}
		},
		saveEdit() {
			try {
				console.log('here');
			}catch(error) {
				console.log(error);
			}
		},
		closeEdit() {
			this.$emit('close');
		}
	},
	created() {
		console.log(this.booking)

		this.bookingEdit = JSON.parse(JSON.stringify(this.booking));
		this.checkInOut = [ this.booking.checkIn, this.booking.checkOut ]
	},
	watch: {
		checkInOut() {
			this.getRoomTypes();
		},
		'bookingEdit.roomType': function() {
			this.rooms = this.roomsAll.filter(room => {

				console.log('roomType',this.bookingEdit.roomType.uuid)
				console.log('room',this.bookingEdit.room)

				return room.roomTypeUuid == this.bookingEdit.roomType.uuid
			})
		}
	}
}
</script>

<style scoped>

.inputLabel {
	font-size: 15px;
}

</style>