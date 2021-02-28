<template>

		<!-- card: the main container
card-header: a horizontal bar with a shadow
card-header-title: a left-aligned bold text
card-header-icon: a placeholder for an icon
card-image: a fullwidth container for a responsive image
card-content: a multi-purpose container for any other element
card-footer: a horizontal list of controls
card-footer-item: a repeatable list item
		-->
	<div v-if="rooms">
		Manage Rooms

		<b-button
			outline
			type="is-success"
			@click="toggleCreateDialog()"
		>
			Create
		</b-button>

		<div v-for="room in rooms" :key="room.uuid">
			<div class="card" style="margin: 0 20% 20px 20%; border: 3px solid grey">
				<div class="card-content">
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

				<footer class="card-footer">
					<div class="card-footer-item">
						<b-button type="is-primary" 
							outlined
							icon-pack="fas"
							icon-left="pencil-alt"
							label="Edit"
							@click="openEditDialog(room)"
							style="margin: 0 5px 0 0"
						/>
						<b-button type="is-primary is-danger" 
							outlined
							icon-pack="fas"
							icon-left="trash-alt"
							label="Delete"
							@click="openDeleteDialog(room)"
							style="margin: 0 5px 0 0"
						/>
					</div>
				</footer>
			</div>
		</div>


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
		}
	},
	components: { DeleteDialog, CreateDialog },
	methods: {
		async getRooms() {

			try {
				const { data } = await axios.get('http://localhost:3000/api/room');

				this.rooms = data.rooms;
				this.addOns = data.addOns;

			} catch(error) {
				console.log(error);
			}
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

<style>

</style>