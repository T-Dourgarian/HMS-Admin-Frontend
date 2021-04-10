<template>
	<div style="height: 100vh">
		<div v-if="$store.state.user.loggedIn">
			<Navigation />
		</div>
		<div style="background: rgb(238, 238, 238)">
			<router-view></router-view>
		</div>
	</div>
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
