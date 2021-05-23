<template>
	<!-- <b-navbar :style="navbarStyle">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
                HMS
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link"  :to="{ path: '/dashboard' }">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link"  :to="{ path: '/room' }">
                Rooms
            </b-navbar-item>
            <b-navbar-item tag="router-link"  :to="{ path: '/calendar' }">
                Calendar
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button
						type="is-primary"
						@click="logOut()"
					>
						Log Out
					</b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar> -->

    <v-navigation-drawer
      absolute
      light
      expand-on-hover
		class="navbar"
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="`/${item.title}`" 
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  > {{ item.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

		<v-list-item
			link
		>
			<v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="logOut()" > Log out </v-list-item-title>
          </v-list-item-content>
		</v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					title: 'Dashboard',
					icon:"fas fa-clipboard-list"
				}, 
				{
					title: 'Rooms',
					icon: "fas fa-bed"
				}, 
				{
					title: 'Calendar',
					icon:"fas fa-calendar-alt"
				}
			]
		}
	},
	methods: {
		logOut() {

			console.log(this.$store.state)

			this.$router.push(`/login/${this.$store.state.user.company.name}`);
			this.$store.commit('clearAuth');
		},
	},
	computed: {
	}
}
</script>

<style >

.navbar {
	background-color: rgb(238, 238, 238) !important;
}

</style>