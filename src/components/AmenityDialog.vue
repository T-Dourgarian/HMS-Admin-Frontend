<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Manage Amenities</p>
				<button class="delete" aria-label="close" @click="close()"></button>
			</header>
			<section class="modal-card-body">
				
				<v-row align="center">
					<v-col cols="5" class="px-0">
						<b-input 
							v-model="amenityName"
							placeholder="Name"
						></b-input>
					</v-col>
					<v-col cols="4">
						<b-select 
							placeholder="Select an icon" 
							v-model="selectedIcon"
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
					<v-col cols="1" class="pl-0" >
						<v-icon>
							fas fa-{{ selectedIcon }}
						</v-icon>
					</v-col>
					<v-col cols="2" class="pl-0">
						<b-button
							type="is-success"
							@click="createAmenity()"
						>
							Create
						</b-button>
					</v-col>
				</v-row>

				
				<v-row >
					<v-col>
						<div><b>Amenities</b></div>
						<div v-for="amenity in amenities" :key="amenity.uuid">
							<v-icon small>fas fa-{{ amenity.icon }}</v-icon> - {{ amenity.name }}
						</div>
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
			amenities: [],
			icons:['baby-carriage','bath','bed','briefcase',
			'car','cocktail','coffee','concierge-bell','dice',
			'dice-five','door-closed','door-open','dumbbell',
			'glass-martini','glass-martini-alt','hot-tub','hotel',
			'infinity','key','luggage-cart','shower','shuttle-van',
			'smoking','smoking-ban','snowflake','spa','suitcase',
			'suitcase-rolling','swimmer','swimming-pool','tv',
			'umbrella-beach','utensils','wheelchair','wifi'],
			selectedIcon: null,
			amenityName: null
		}
	}, methods: {
		async getAmenities() {
			try {

				const { data } = await axios.get('http://localhost:3000/api/amenity');

				this.amenities = data;
				console.log('data',data);

			} catch(error) {
				console.log(error);
			}
		},
		async createAmenity() {
			try {

				await axios.post('http://localhost:3000/api/amenity/create', {
					name: this.amenityName,
					icon: this.selectedIcon
				});

				this.selectedIcon = null;
				this.amenityName = null;

				this.getAmenities();

			} catch(error) {
				console.log(error);
			}
		},
		close() {
			this.$emit('cancel')
		}
	},
	created() {
		this.getAmenities();
	},
}
</script>

<style scoped>

</style>