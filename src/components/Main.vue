<template>
	<div style="height: 100vh">
		<Navigation />
		<router-view></router-view>
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
