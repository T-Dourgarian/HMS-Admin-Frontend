<template>
  <div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Edit Room Details</p>
				<button class="delete" aria-label="close" @click="closeEdit()"></button>
			</header>
			<section class="modal-card-body">
				<b-field label="Name">
					<b-input v-model="room.name"></b-input>
				</b-field>

				<b-field label="Sub-title">
					<b-input v-model="room.subtitle"></b-input>
				</b-field>

				<b-field label="Description">
					<b-input v-model="room.description" maxlength="400" type="textarea" ></b-input>
				</b-field>

			
				<v-row>
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
					<v-col>
						<span style="font-weight:600">Amenities</span>
						<div v-for="amenity in amenities" :key="amenity.uuid">
							<div>
								<b-checkbox 
									v-model="room.amenities"
									:native-value="amenity"
								>
									{{ amenity.name }}
								</b-checkbox>
							</div>
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
			room: {
				name:null,
				addOns: [],
				amenities: []
			},
			addOns: [],
			amenities: []
		}
	},
	props: ['roomToEdit', 'allAddOns', 'allAmenities'],
	methods: {
		async saveEdit() {
			try {

				console.log(this.room)

				await axios.put(`http://localhost:3000/api/room/update/${this.roomToEdit.uuid}`, this.room)

				this.$emit('refreshRooms');		
				
				this.closeEdit();
			} catch(error) {
				console.log(error);
			}
		},
		closeEdit() {
			this.$emit('cancel');
		}
	},
	created() {

		this.room = JSON.parse(JSON.stringify(this.roomToEdit));
		this.addOns = JSON.parse(JSON.stringify(this.allAddOns));
		this.amenities = JSON.parse(JSON.stringify(this.allAmenities));

	}
}
</script>

<style>

</style>