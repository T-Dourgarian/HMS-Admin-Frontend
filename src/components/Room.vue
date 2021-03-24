<template>
	<div>
		<!-- <b-button
			outline
			type="is-success"
			@click="toggleCreateDialog()"
		>
			Create
		</b-button> -->

		<!-- <div v-for="room in rooms" :key="room.uuid"> -->
			<!-- <div class="card" >
				<div class="card-content ">
	
					<div >
						<div class="title" >
							{{ room.name }}
						</div>

						<div class="subtitle">
							{{ room.subtitle }}
						</div>

						<div class="content">
							{{ room.description }}
						</div>
					</div>
				</div>

				<footer class="card-footer">
				</footer>
			</div> -->
		<!-- </div> -->


		
		<v-row style="height: 92vh; maxHeight: 92vh; margin: 0 !important;">
			<v-col cols="3" style="maxHeight: inherit" class="pa-0 darkPurpleText darkPurpleBackground">
				<div v-for="room in rooms" :key="room.uuid">
					<b-button
						style="width:100%"
						@click="selectRoom(room)"
						:style="buttonStyle(room)"
					>
						{{ room.name }}
					</b-button>
				</div>
			</v-col>
			<v-col cols="9" >
				<div class="title darkPurpleText">
					{{ selectedRoom.name }}
				</div>
				<div class="subtitle is-6 darkPurpleText">
					{{ selectedRoom.subtitle }}
				</div>
			<div>
				<div class="title is-5" style='borderBottom: 1px solid #453f54; width:200px !important;'>
					Description
				</div>
				<div class="subtitle is-6">
					{{ selectedRoom.description }}
				</div>
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

	</div>
</template>

<script>
import axios from 'axios';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';


export default {
	data() {
		return {
			rooms: null,
			addOns: null,
			editDialog: false,
			deleteDialog: false,
			createDialog: false,
			roomToEdit: {
				addOns: []
			},
			selectedRoom: {}
		}
	},
	components: { DeleteDialog, CreateDialog },
	methods: {
		async getRooms() {

			try {
				const { data } = await axios.get('http://localhost:3000/api/room');

				this.rooms = data.rooms;
				this.addOns = data.addOns;
				this.selectedRoom = data.rooms[0]

			} catch(error) {
				console.log(error);
			}
		},
		selectRoom(room) {
			this.selectedRoom = room;
		},
		buttonStyle(room) {

			let buttonStyle = {
				'color': '#c8b9f0',
				'borderRadius':'0',
				'outline': 'none',
				border: 'none',
				'box-shadow': 'none !important',
				background: 'transparent',
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
		toggleCreateDialog() {
			this.createDialog = !this.createDialog;
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



</style>