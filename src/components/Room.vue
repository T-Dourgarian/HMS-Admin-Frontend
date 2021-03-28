<template>
	<div>
		<!-- <b-button
			outline
			type="is-success"
			@click="toggleCreateDialog()"
		>
			Create
		</b-button> -->


		
		<v-row style="height: 92vh; maxHeight: 92vh; margin: 0 !important;">
			<v-col cols="3" style="maxHeight: inherit; position: relative;" class="pa-0 darkPurpleBackground">
				<div v-for="room in rooms" :key="room.uuid">
					<b-button
						@click="selectRoom(room)"
						:style="buttonStyle(room)"
					>
						{{ room.name }}
					</b-button>
				</div>
				<div >
					<b-button
						class="amenityButton"
						@click="openAmenities()"
					>
						Manage Amenities
					</b-button>
				</div>
			</v-col>
			<v-col cols="9" >

				<div class="card">
					<div class="card-content">
						<div class="content">
							<v-row>
								<v-col cols="3">
									<div class="darkPurpleText">
										<b>Room Name</b>
									</div>
									<div class="subtitle is-6">
										{{ selectedRoom.name }}
									</div>
								</v-col>
								<v-col cols="3">
									<div class="darkPurpleText">
										<b>Subtitle</b>
									</div>
									<div class="subtitle is-6">
										{{ selectedRoom.subtitle }}
									</div>
								</v-col>
								<v-col cols="6">
									<div>
										<div class="darkPurpleText" >
											<b>Description</b>
										</div>
										<div class="subtitle is-6">
											{{ selectedRoom.description }}
										</div>
									</div>
								</v-col>
							</v-row>
							<v-row>
								<v-col >
									<div>
										<div class="darkPurpleText" >
											<b>Add-ons</b>
										</div>
										<div 
											v-for="addOn in selectedRoom.addOns" 
											:key="addOn.uuid"
										>
											<div>{{ addOn.name }} - ${{ addOn.cost }}</div>
										</div>
									</div>
								</v-col>
								<v-col  >
									<div class="darkPurpleText">
										<b>Amenities</b>
									</div>
								</v-col>
							</v-row>
						</div>
					</div>
				</div>

				<div>
					<v-row>
						<v-col cols='1'>
							<b-button
								type="is-primary"
								outlined
								icon-left="fas fa-edit"
								small
								@click="openEditDialog(selectedRoom)"
							>
								Edit
							</b-button>
						</v-col>
						<v-col cols='1'>
							<b-button
								type="is-primary"
								outlined
								icon-left="fas fa-trash"
								small
								@click="openDeleteDialog(selectedRoom)"
							>
								Delete
							</b-button>
						</v-col>
					</v-row>
					
				</div>
			</v-col>
		</v-row>

		<div class="modal" :class="{'is-active': editDialog && roomToEdit}" >
			<div class="modal-background">				
			</div>
			
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Edit Room Details</p>
					<button class="delete" aria-label="close" @click="cancelEdit()"></button>
				</header>
				<section class="modal-card-body">
					<b-field label="Name">
						<b-input v-model="roomToEdit.name"></b-input>
					</b-field>

					<b-field label="Sub-title">
						<b-input v-model="roomToEdit.subtitle"></b-input>
					</b-field>

					<b-field label="Description">
						<b-input v-model="roomToEdit.description" maxlength="200" type="textarea" ></b-input>
					</b-field>

					<span style="font-weight:600">Available add-ons</span>
					<div v-for="addOn in addOns" :key="addOn.uuid">
						<div>
							<b-checkbox 
								v-model="roomToEdit.addOns"
								:native-value="addOn"
							>
								{{ addOn.name }} ${{ addOn.cost }}
							</b-checkbox>
						</div>
					</div>


				</section>

				<footer class="modal-card-foot">
					<button 
						class="button is-success"
						@click="saveEdit()"
					>
						Save changes
					</button>
					<button 
						class="button"
						@click="cancelEdit()"
					>
						Cancel
					</button>

				</footer>
			</div>
		</div>


		<!-- delete dialog -->
		<DeleteDialog 
			v-if="deleteDialog"
			:room="roomToEdit" 
			@cancel="deleteDialog = false"	
			@refreshRooms="getRooms()"
		/> 

		<!-- create dialog -->
		<CreateDialog
			v-if="createDialog"
			:addOns="addOns" 
			@cancel="toggleCreateDialog()"	
			@refreshRooms="getRooms()"
		/>

		<!-- AmenityDialog -->
		<AmenityDialog 
			v-if="amenityDialog"
			@cancel="toggleAmenityDialog()"	
		/>

	</div>
</template>

<script>
import axios from 'axios';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';
import AmenityDialog from './AmenityDialog';


export default {
	data() {
		return {
			rooms: null,
			addOns: null,
			editDialog: false,
			deleteDialog: false,
			createDialog: false,
			amenityDialog: false,
			roomToEdit: {
				addOns: []
			},
			selectedRoom: {}
		}
	},
	components: { DeleteDialog, CreateDialog, AmenityDialog },
	methods: {
		async getRooms() {

			try {
				const { data } = await axios.get('http://localhost:3000/api/room');

				this.rooms = data.rooms;
				this.addOns = data.addOns;
				this.selectedRoom = data.rooms[0]
				console.log(this.selectedRoom)

			} catch(error) {
				console.log(error);
			}
		},
		selectRoom(room) {
			this.selectedRoom = room;
		},
		buttonStyle(room) {

			let buttonStyle = {
				'width':'100%',
				'color': '#c8b9f0',
				'borderRadius':'0',
				'outline': 'none',
				'border': 'none',
				'box-shadow': 'none !important',
				'background': 'transparent',
				'font-family': 'Roboto, sans-serif'
			};

			if (this.selectedRoom.uuid == room.uuid) {
				buttonStyle.color = '#e0d9f3'
			}


			return buttonStyle;
		},
		openEditDialog(room) {
			this.roomToEdit = room;
			this.editDialog = true;
		},
		openDeleteDialog(room) {
			this.roomToEdit = room
			this.deleteDialog = true;
		},
		openAmenities() {
			this.amenityDialog = true;
		},
		toggleCreateDialog() {
			this.createDialog = !this.createDialog;
			this.getRooms();
		},
		toggleAmenityDialog() {
			this.amenityDialog = !this.amenityDialog;
			this.getRooms();
		},
		async saveEdit() {
			try {

				console.log(this.roomToEdit)

				await axios.put(`http://localhost:3000/api/room/update/${this.roomToEdit.uuid}`, this.roomToEdit)

				this.getRooms();				
				
				this.editDialog = false;
			} catch(error) {
				console.log(error);
			}
		},
		cancelEdit() {
			this.editDialog = false;
		}
	},
	created() {

		this.getRooms();

	}
}
</script>

<style scoped>

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

.amenityButton {
	width:100%;
	height: 50px;
	color: #c8b9f0 !important;
	border-radius: 0;
	outline: none;
	border: none;
	box-shadow: none !important;
	background: rgb(56, 47, 70);
	font-family: Roboto, sans-serif;
	position: absolute;
	bottom: 0;
}

.amenityButton:hover {
	color: white !important;
}

</style>