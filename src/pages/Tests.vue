<template>
	<Layout title="الفحوصات">
		<v-card class="py-4 px-2" max-width="250">
			<v-responsive class="mx-auto text-center">
				<div class="mb-2 text-h5 test">
					<span>COVID-19</span>
				</div>
				<div class="text-h6 mt-3">
					فحص كورونا
				</div>
			</v-responsive>
		</v-card>
	</Layout>
</template>

<script>
import Layout from './layout/Layout';

export default {
	name: 'Tests',

	components: {
		Layout,
	},

	data: () => ({}),

	computed: {},

	methods: {},
};
</script>

<style lang="scss" scoped>
.test {
	color: #2a4f66 !important;
}
</style>
