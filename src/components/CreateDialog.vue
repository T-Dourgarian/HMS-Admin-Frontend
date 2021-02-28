<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Create Room</p>
				<button class="delete" aria-label="close" @click="cancelCreate()"></button>
			</header>
			<section class="modal-card-body">
				
				<b-field label="Name" class="control">
					<b-input 
						v-model="newRoom.name" 
						required
					></b-input>
				</b-field>

				<b-field label="Subtitle">
					<b-input 
						v-model="newRoom.subtitle" 
						required
					></b-input>
				</b-field>

				<b-field label="Description">
					<b-input 
						v-model="newRoom.description" 
						maxlength="200" 
						type="textarea" 
						required 
					></b-input>
				</b-field>



				<!-- add ons -->
				<span style="font-weight:600">Available add-ons</span>
				<b-button 
					class="is-small is-primary" 
					style="margin:0 0 0 10px"
					@click="selectAllAddOns()"
					rounded 
					outlined
				> 
					Select All
				</b-button>

				<div v-for="addOn in addOns" :key="addOn.uuid">
					<div>
						<b-checkbox 
							v-model="newRoom.addOns"
							:native-value="addOn"
						>
							{{ addOn.name }} ${{ addOn.cost }}
						</b-checkbox>
					</div>
				</div>
			</section>

			<footer class="modal-card-foot">
				<b-button 
					class="button is-success"
					@click="createRoom()"
					:loading="createLoading"
				>
					Create Room
				</b-button>
				<button 
					class="button"
					@click="cancelCreate()"
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
			newRoom: {
				name: null,
				subtitle: null,
				description: null,
				addOns: []
			},
			createLoading: false,
		}
	},
	props: ['addOns'],
	methods: {
		cancelCreate() {
			this.$emit('cancel');
		},
		selectAllAddOns() {
			this.newRoom.addOns = this.addOns;
		},
		async createRoom() {
			try {
				if (this.validInputs) {
					this.createLoading = true;

					await axios.post('http://localhost:3000/api/room/create', this.newRoom);

					this.$buefy.toast.open({
						duration: 2500,
						message: `Room Created.`,
						position: 'is-bottom',
						type: 'is-success'
					})
					
					this.createLoading = false;
					this.$emit('refreshRooms');
					this.$emit('cancel');
				}
			} catch(error) {
				this.createLoading = false;
				
				this.$buefy.toast.open({
                    duration: 2500,
                    message: `An error has occurred - Create room unsuccessful.`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })

			}
		}
	},
	computed: {
		validInputs() {
			return this.newRoom.name &&
				this.newRoom.subtitle &&
				this.newRoom.description
		}
	},
	create() {
		console.log(this.addOns)
	}
}
</script>

<style>

</style>