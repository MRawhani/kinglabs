<template>
	<v-app>
		<RouterView :key="$route.fullPath" />
	</v-app>
</template>

<script>
export default {
	name: 'App',

	page: {
		titleTemplate(title) {
			title = typeof title === 'function' ? title(this.$store) : title;
			return title ? `${title} | King labs` : 'King labs';
		},
	},

	created() {
		this.$vuetify.rtl = true;
		this.$vuetify.lang.current = 'ar';
	},
};
</script>
<style lang="scss">
@import '~nprogress/nprogress.css';

.v-application {
	background-color: #eceff3 !important;
}

.v-application a {
	text-decoration: none !important;
}
</style>
