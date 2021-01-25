<template>
	<Layout>
		<div class="text-center pt-12">
			<p class="display-3 pb-4">Access denied</p>
			<p class="heading">You have no access to this page!</p>
			<v-btn :to="$route.query.redirectTo" text large class="my-5"><v-icon class="mr-3">mdi-arrow-left</v-icon>Go back</v-btn>
		</div>
	</Layout>
</template>

<script>
import Layout from './layout/Layout';

export default {
	name: 'AccessDenied',
	components: {
		Layout,
	},
	page: {
		title: 'Access denied',
	},
};
</script>

<style lang="scss" scoped></style>
