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
						/>
					</div>
				</footer>
			</div>
		</div>


		<div class="modal" :class="{'is-active': editDialog}" >
			<div class="modal-background">				
			</div>
			
			<div class="modal-card">
				<header class="modal-card-head">
				<p class="modal-card-title">Modal title</p>
				<button class="delete" aria-label="close"></button>
				</header>
				<section class="modal-card-body">
					<b-field label="Name">
						<b-input v-model="name"></b-input>
					</b-field>

					<b-field label="Email"
						type="is-danger"
						message="This email is invalid">
						<b-input type="email"
							value="john@"
							maxlength="30">
						</b-input>
					</b-field>

					<b-field label="Username"
						type="is-success"
						message="This username is available">
						<b-input value="johnsilver" maxlength="30"></b-input>
					</b-field>

					<b-field label="Password">
						<b-input type="password"
							value="iwantmytreasure"
							password-reveal>
						</b-input>
					</b-field>

					<b-field label="Message">
						<b-input maxlength="200" type="textarea"></b-input>
					</b-field>
				</section>
				<footer class="modal-card-foot">
					<button 
						class="button is-success"
						@click="saveRoom()"
					>
						Save changes
					</button>
					<button class="button">
						Cancel
					</button>
				</footer>
			</div>
		</div>

	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			rooms: null,
			editDialog: false,
			roomToEdit: null,
		}
	},
	methods: {
		async getRooms() {

			try {
				const { data } = await axios.get('http://localhost:3000/api/room');

				this.rooms = data;

			} catch(error) {
				console.log(error);
			}
		},
		openEditDialog(room) {
			this.roomToEdit = room;
			this.editDialog = true;


			console.log(room)
		},
		saveRoom() {
			try {


				this.editDialog = false;
			} catch(error) {
				console.log(error);
			}
		}
	},
	created() {

		this.getRooms();

	}
}
</script>

<style>

</style>