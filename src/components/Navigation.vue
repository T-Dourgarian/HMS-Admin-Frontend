<template>
	<b-navbar :style="navbarStyle">
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
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
	computed: {
		navbarStyle: () => {
			return {
				'border-bottom':'2px solid #7957d5',
				'height':'8vh',
				'backgroundColor': 'rgb(238, 238, 238)'
			}
		}
	}
}
</script>

<style>

.style {
	background: rgb(238, 238, 238);
}

</style>