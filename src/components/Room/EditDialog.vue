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

				<v-row class="ma-0">
					<v-col>
						<b-field class="file is-primary" :class="{'has-name': !!file}">
							<b-upload v-model="file" class="file-label" @input="handleImageSelect">
								<span class="file-cta">
									<b-icon class="file-icon" icon="upload"></b-icon>
									<span class="file-label">Click to upload</span>
								</span>
								<span class="file-name" v-if="file">
									{{ file.name }}
								</span>
							</b-upload>
						</b-field>
					</v-col>
				</v-row>
				<v-row class="ma-0">
					<v-col cols="12" v-for="(image, i) in room.images" :key="i" class="imageContainer">
						<b-button size="is-small" type="is-danger" icon-left="fas fa-times" class="deleteImageButton" @click="handleImageDelete(image.uuid)"></b-button>
						<img :style="{height:'auto', border: imagesToDelete.includes(image.uuid) ? '1px solid red' : '' }" :src="'http://localhost:3000' + image.path" alt="">
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

				<div v-if="imagesToDelete.length">
					Deleting {{ imagesToDelete.length }} images
				</div>
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
			imagesToDelete:[],
			addOns: [],
			amenities: [],
			file: null
		}
	},
	props: ['roomToEdit', 'allAddOns', 'allAmenities'],
	methods: {
		async saveEdit() {
			try {

				console.log(this.room)

				await axios.put(`http://localhost:3000/api/room/update/${this.roomToEdit.uuid}`, this.room)

				if (this.file) {
					this.uploadImage();
				}

				if (this.imagesToDelete.length) {
					for (let uuid of this.imagesToDelete) {
						this.deleteImage(uuid);
					}
				}

				this.$emit('refreshRooms');		
				this.closeEdit();
				
			} catch(error) {
				console.log(error);
			}
		},
		closeEdit() {
			this.$emit('cancel');
		},
		handleImageSelect(file) {
			this.file = file;
		},
		handleImageDelete(uuid) {
			if (this.imagesToDelete.includes(uuid)) {
				this.imagesToDelete = this.imagesToDelete.filter(image => image !== uuid);
			} else {
				this.imagesToDelete.push(uuid);
			}

		},
		async uploadImage() {
			try {

				let formData = new FormData();
				formData.append("image", this.file);
				formData.append("name", this.file.name);
				formData.append("roomTypeUuid", this.room.uuid);


				const { data } = await axios.post('http://localhost:3000/api/image/upload', 
					formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});

				console.log(data);

			} catch(error) {
				console.log(error);
			}
		},
		async deleteImage(uuid) {
			try {

				await axios.delete(`http://localhost:3000/api/image/delete/${uuid}`);

			} catch(error) {
				console.log(error);
			}
		},
	},
	created() {

		this.room = JSON.parse(JSON.stringify(this.roomToEdit));
		this.addOns = JSON.parse(JSON.stringify(this.allAddOns));
		this.amenities = JSON.parse(JSON.stringify(this.allAmenities));

	}
}
</script>

<style>

.imageContainer {
	position: relative;
}

.deleteImageButton {
	position: absolute;
	left:93%;
	top:9%;
}

</style>