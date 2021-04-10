<template>
	<div>
		<b>404 error route {{ route }} not found</b>
	</div>
</template>

<script>
export default {
	computed: {
		route() {
			return this.$route.fullPath
		}
	}
}
</script>

<style>

</style>