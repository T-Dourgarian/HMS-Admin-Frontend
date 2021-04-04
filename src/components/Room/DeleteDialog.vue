<template>
	<div class="modal" :class="{'is-active': true}" >
		<div class="modal-background">				
		</div>
		
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Delete Room</p>
				<button class="delete" aria-label="close" @click="cancelDelete()"></button>
			</header>
			<section class="modal-card-body">
				
			<div>
				Are you sure you want to delete the {{ room.name }}?
			</div>

			</section>

			<footer class="modal-card-foot">
				<b-button 
					class="button is-danger"
					@click="deleteRoom()"
					:loading="deleteLoading"
				>
					Delete Room
				</b-button>
				<button 
					class="button"
					@click="cancelDelete()"
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
			deleteLoading: false
		}
	},
	props: [ 'room' ],
	methods: {
		async deleteRoom() {
			try {
				this.deleteLoading = true;

				await axios.delete(`http://localhost:3000/api/room/delete/${this.room.uuid}`);

				this.$buefy.toast.open({
                    duration: 2500,
                    message: `Room Deleted`,
                    position: 'is-bottom',
                    type: 'is-success'
                })

				this.deleteLoading = false;

				this.$emit('refreshRooms');

				this.cancelDelete();
			} catch(error) {
				console.log(error)

				this.$buefy.toast.open({
                    duration: 2500,
                    message: `An error has occurred - Delete unsuccessful.`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })

				this.deleteLoading = false;
				this.cancelDelete();
			}
		},
		cancelDelete() {
			this.$emit('cancel')
		}
	}
}
</script>

<style>

</style>