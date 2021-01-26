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
.v-application {
	background-color: #f2f5f8 !important;
}

.v-application a {
	color: #0096c7 !important;
	text-decoration: none !important;
}
</style>
