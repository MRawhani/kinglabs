<template>
	<div>
		<TopNavbar></TopNavbar>
		<SideBar></SideBar>
		<v-main>
			<v-container fluid class="px-5 pb-8">
				<div class="pt-3">
					<slot />
				</div>
			</v-container>
		</v-main>
	</div>
</template>

<script>
import SideBar from './SideBar';
import TopNavbar from './TopNavbar';

export default {
	components: {
		SideBar,
		TopNavbar,
	},

	data: () => ({}),

	methods: {},
};
</script>

<style lang="scss" scoped></style>
