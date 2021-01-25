<template>
	<Layout>
		<div class="text-center pt-12">
			<p class="display-4 font-weight-bold pb-4">4<span class="primary--text">0</span>4</p>
			<p class="display-1">Page Not found!</p>
			<p class="heading">Sorry! there is no such a page!</p>
			<v-btn to="/" text large class="my-5"><v-icon class="mr-3">mdi-arrow-left</v-icon> back to home</v-btn>
		</div>
	</Layout>
</template>

<script>
import Layout from './layout/Layout';

export default {
	components: {
		Layout,
	},
	page: {
		title: 'Not found',
	},
};
</script>

<style lang="scss" scoped></style>
