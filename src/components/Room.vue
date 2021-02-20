<template>
	<div v-if="rooms">
		Manage Rooms

		<div v-for="room in rooms" :key="room.uuid">
			<div>
				{{ room.name }}
				{{ room.subtitle }}
				{{ room.description }}
				{{ room.name }}
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			rooms: null
		}
	},
	methods: {
		async getRooms() {

			try {
				const { data } = await axios.get('http://localhost:3000/api/room');

				this.rooms = data;

				console.log(this.rooms)

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