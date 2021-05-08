<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Manage Add-ons and Amenities</p>
				<button class="delete" aria-label="close" @click="close()"></button>
			</header>
			<section class="modal-card-body">
				
				<v-row>
					<v-col>
						<div><b>Amenities</b></div>
						<v-row align="center">
							<v-col cols="12" >
								<b-input 
									v-model="amenityName"
									placeholder="Name"
								></b-input>
							</v-col>
							<v-col cols="12">
								<v-row align="center">
									<v-col>
										<b-select 
											placeholder="Select an icon" 
											v-model="selectedIcon"
											style=""
										>
											<option
												v-for="icon in icons"
												:value="icon"
												:key="icon"
											>
												{{ icon }}
											</option>
										</b-select>
									</v-col>
									<v-col>
										<v-icon>
											fas fa-{{ selectedIcon }}
										</v-icon>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="12">
								<b-button
									type="is-success"
									@click="createAmenity()"
								>
									Create
								</b-button>
							</v-col>
						</v-row>

						<div style="fontSize:13px"> {{ this.amenityErrorMsg }}</div>
						
						<v-row>
							<v-col>
								<div v-for="amenity in amenities" :key="amenity.uuid">
									<v-icon small>fas fa-{{ amenity.icon }}</v-icon> - {{ amenity.name }}
								</div>
							</v-col>
						</v-row>
					</v-col>
					<v-col>
						<div><b>Add-ons</b></div>
						<v-row align="center">
							<v-col cols="12" >
								<b-input 
									v-model="addOnName"
									placeholder="Name"
								></b-input>
							</v-col>
							
							<v-col class="pb-0" cols="12" >
								<b-input 
									type="textarea"
									maxlength="100"
									v-model="addOnDescription"
									placeholder="Desciprion"
								></b-input>
							</v-col>



							<v-col class="pt-0" cols="12" >
								<b-input 
									type="number"
									v-model="addOnPrice"
									placeholder="Price"
									icon="fas fa-dollar-sign"
								></b-input>
							</v-col>

							<v-col cols="12">
								<b-button
									type="is-success"
									@click="createAddOn()"
								>
									Create
								</b-button>
							</v-col>
						</v-row>

						<div style="fontSize:13px"> {{ this.addOnErrorMsg }}</div>
						
						<v-row>
							<v-col>
								<div v-for="addOn in addOns" :key="addOn.uuid">
									{{ addOn.name }} - ${{ addOn.cost }}
								</div>
							</v-col>
						</v-row>

					</v-col>
				</v-row>
			</section>

			<footer class="modal-card-foot">
				<button 
					class="button"
					@click="close()"
				>
					Close
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
			icons:['baby-carriage','bath','bed','briefcase',
			'car','cocktail','coffee','concierge-bell','dice',
			'dice-five','door-closed','door-open','dumbbell',
			'glass-martini','glass-martini-alt','hot-tub','hotel',
			'infinity','key','luggage-cart','shower','shuttle-van',
			'smoking','smoking-ban','snowflake','spa','suitcase',
			'suitcase-rolling','swimmer','swimming-pool','tv',
			'umbrella-beach','utensils','wheelchair','wifi'],
			selectedIcon: null,
			amenityName: null,
			amenityErrorMsg: null,
			addOnErrorMsg: null,
			addOnName: null,
			addOnPrice: null,
			addOnDescription: null
		}
	}, 
	props: ['amenities', 'addOns'],
	methods: {
		async createAmenity() {
			try {

				this.amenityErrorMsg = '';

				if (this.amenityName && this.selectedIcon) {
					await axios.post('http://localhost:3000/api/amenity/create', {
						name: this.amenityName,
						icon: this.selectedIcon,
						companyUuid: this.$store.state.user.company.uuid
					});

					this.selectedIcon = null;
					this.amenityName = null;

					this.refreshData();

				} else {
					this.amenityErrorMsg = 'Please select both a name and icon to create an amenity';
				}
			} catch(error) {
				console.log(error);
			}
		},
		async createAddOn() {
			if (this.addOnName && this.addOnPrice && this.addOnDescription) {

					this.addOnErrorMsg = '';

					await axios.post('http://localhost:3000/api/addon/create', {
						name: this.addOnName,
						cost: this.addOnPrice,
						description: this.addOnDescription,
						companyUuid: this.$store.state.user.company.uuid
					});


					this.addOnName = null;
					this.addOnPrice = null;
					this.addOnDescription = null;

					this.refreshData();

				} else {
					this.addOnErrorMsg = 'Please select both a name and icon to create an amenity';
				}
		},
		refreshData() {
			this.$emit('refreshData');
		},
		close() {
			this.$emit('cancel')
		}
	}
}
</script>

<style scoped>

</style>