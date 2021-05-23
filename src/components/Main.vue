<template>
	<v-row class="ma-0 pa-0" style="height: 100vh">
			<div style="width:50px" v-if="$store.state.user.loggedIn" >
				<Navigation />
			</div>
			
			<v-col class="pa-0">
				<router-view></router-view>
			</v-col>
			
	</v-row>
</template>

<script>
import Navigation from './Navigation';

export default {
  name: 'Main',
  components: { Navigation },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
