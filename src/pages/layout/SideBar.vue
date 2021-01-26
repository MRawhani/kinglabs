<template>
	<v-navigation-drawer v-model="showDrawer" app right clipped color="#f2f5f8" class="pt-6">
		<v-list nav dense>
			<v-list-item-group color="primary">
				<v-list-item v-for="(link, i) in links" :key="i" link :to="link.href">
					<v-list-item-icon>
						<v-icon>{{ link.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ link.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'SideBar',

	props: {
		drawer: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			showDrawer: this.drawer,
			links: [
				{ title: 'لوحة التحكم', icon: 'mdi-view-dashboard', href: '/' },
				{ title: 'العملاء', icon: 'mdi-human-male-female', href: '/agents' },
				{ title: 'الإختبارات', icon: 'mdi-package', href: '/tests' },
				{ title: 'التقارير', icon: 'mdi-chart-bar', href: '/reports' },
				{ title: 'المستخدمين', icon: 'mdi-account-group', href: '/users' },
			],
		};
	},

	watch: {
		drawer() {
			this.showDrawer = !this.showDrawer;
		},
	},
};
</script>

<style lang="scss" scoped></style>
