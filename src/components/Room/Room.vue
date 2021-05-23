<template>
	<div>
		<!-- <b-button
			outline
			type="is-success"
			@click="toggleCreateDialog()"
		>
			Create
		</b-button> -->


		
		<v-row class="ma-0" style="height: 100vh">
			<v-col cols="3" style="maxHeight: inherit; position: relative;" class="pa-0 darkPurpleBackground">
				<div >
					<b-button
						class="createButton"
						@click="toggleCreateDialog()"
					>
						<v-row align="center" justify="center">
							<v-col class="px-0">
								<v-icon style="margin: auto" small color="rgb(238, 238, 238)">fas fa-plus</v-icon>
							</v-col>
							<v-col>
								Create Room
							</v-col>
						</v-row>
					</b-button>
				</div>
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
								<v-col >
									<div>
										<div class="darkPurpleText" >
											<b>Amenities</b>
										</div>
										<div 
											v-for="amenity in selectedRoom.amenities" 
											:key="amenity.uuid"
										>
											<v-icon small >fas fa-{{ amenity.icon }}</v-icon><span> {{ amenity.name }}</span>
										</div>
									</div>
								</v-col>
								<v-col cols="6">
									<b-carousel
										:pause-hover="false"
										:autoplay="false"
										style="height:400px"
									>
										<b-carousel-item v-for="(image, i) in selectedRoom.images" :key="i">
											<section> 
													<img style="height:400px" :src="'http://localhost:3000' + image.path" alt="">
												
											</section>
										</b-carousel-item>
									</b-carousel>
								</v-col>
							</v-row>

							<div class="card-footer">
								<v-row style="margin:0 !important">
									<v-col cols='2' class="pb-0">
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
									<v-col cols='2' class="pb-0">
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
						</div>
					</div>
				</div>

				<div>

					
				</div>
			</v-col>
		</v-row>

		<EditDialog 
			v-if="editDialog"
			:roomToEdit="selectedRoom"
			:allAddOns="addOns"
			:allAmenities="amenities"
			@cancel="cancelEdit()"
			@refreshRooms="getRooms()"
		/>


		<!-- delete dialog -->
		<DeleteDialog 
			v-if="deleteDialog"
			:room="selectedRoom" 
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
			:amenities="amenities"
			:addOns="addOns"
			@refreshData="getRooms()"
			@cancel="toggleAmenityDialog()"	
		/>

	</div>
</template>

<script>
import axios from 'axios';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';
import EditDialog from './EditDialog'
import AmenityDialog from './AmenityDialog';


export default {
	data() {
		return {
			rooms: null,
			addOns: null,
			amenities: null,
			editDialog: false,
			deleteDialog: false,
			createDialog: false,
			amenityDialog: false,
			selectedRoom: {
				addOns:[]
			}
		}
	},
	components: { DeleteDialog, CreateDialog, AmenityDialog, EditDialog },
	methods: {
		async getRooms() {
			try {
				const { data } = await axios.get(`http://localhost:3000/api/room/${this.$store.state.user.company.uuid}`);

				this.rooms = data.rooms;
				this.addOns = data.addOns;
				this.amenities = data.amenities;
				this.selectedRoom = JSON.parse(JSON.stringify(data.rooms[0]));

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
				buttonStyle.color = '#e0d9f3';
				buttonStyle.background = '#665e79';
			}


			return buttonStyle;
		},
		openEditDialog(room) {
			this.selectedRoom = room;
			this.editDialog = true;
		},
		openDeleteDialog(room) {
			this.selectedRoom = room;
			this.deleteDialog = true;
		},
		openAmenities() {
			this.amenityDialog = true;
		},
		toggleCreateDialog() {
			this.createDialog = !this.createDialog;
		},
		toggleAmenityDialog() {
			this.amenityDialog = !this.amenityDialog;
			this.getRooms();
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

.createButton {
	width: 100%;
	height: 50px;
	background-color: #7957d5;
	color:rgb(238, 238, 238);
	border-radius: 0;
	outline: none;
	border: none;
}

.createButton:hover {
	color:rgb(238, 238, 238) !important
}

</style>