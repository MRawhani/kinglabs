<template>
	<v-navigation-drawer v-model="showDrawer" app right clipped color="#f2f5f7" class="pt-6">
		<v-list nav dense>
			<v-list-item-group v-if="currentUser.type === 'user'" color="primary">
				<template v-for="(link, i) in links">
					<v-list-item v-if="canAccess(link.name)" :key="i" link :to="link.href">
						<v-list-item-icon>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ link.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list-item-group>
			<v-list-item-group v-else color="primary">
				<v-list-item v-for="(link, i) in companyLinks" :key="i" link :to="link.href">
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
import { authComputed } from '../../state/mapper';
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
				{ title: 'لوحة التحكم', icon: 'mdi-view-dashboard', href: '/', name: 'dashboard' },
				{ title: 'العملاء', icon: 'mdi-human-male-female', href: '/agents', name: 'agents' },
				{ title: 'العمليات', icon: 'mdi-inbox-full-outline', href: '/invoices', name: 'invoices' },
				{ title: 'الفحوصات', icon: 'mdi-test-tube', href: '/tests', name: 'tests' },
				{ title: 'التقارير', icon: 'mdi-chart-bar', href: '/reports', name: 'reports' },
				{ title: 'المستخدمين', icon: 'mdi-account-group', href: '/users', name: 'users' },
				{ title: 'الفروع', icon: 'mdi-hospital-building', href: '/branches', name: 'branches' },
				{ title: 'الشركات', icon: 'mdi-domain', href: '/companies', name: 'companies' },
			],
			companyLinks: [{ title: 'عملاء الشركة', icon: 'mdi-human-male-female', href: '/company-agents' }],
		};
	},

	computed: {
		...authComputed,
	},

	watch: {
		drawer() {
			this.showDrawer = !this.showDrawer;
		},
	},

	methods: {
		canAccess(page) {
			return this.currentUser.permissions.includes(page);
		},
	},
};
</script>

<style lang="scss" scoped></style>
