<template>
	<Layout>
		<v-card>
			<v-toolbar flat color="white">
				<v-toolbar-title>
					المستخدمين
				</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-text-field v-model="search" label="بحث" dense outlined single-line hide-details append-icon="mdi-magnify"></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="primary" dark class="mb-1 ms-2">
					<v-icon class="d-none d-sm-block me-2">mdi-plus</v-icon>
					<v-icon class="d-sm-none d-block">mdi-plus</v-icon>
					<span class="d-none d-sm-block"> إظافة مستخدم </span>
				</v-btn>
			</v-toolbar>
		</v-card>
		<v-data-table :headers="headers" :items="users" sort-by="id" class="mt-8 elevation-16" :search="search">
			<template v-slot:[`item.actions`]="{ item }">
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" color="success" @click="editUser(item)" v-on="on">
							<v-icon size="18">mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span> تعديل </span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" class="mx-3" color="error" @click="deleteUser(item)" v-on="on">
							<v-icon size="18">mdi-delete</v-icon>
						</v-btn>
					</template>
					<span>حذف</span>
				</v-tooltip>
			</template>
		</v-data-table>
	</Layout>
</template>

<script>
import Layout from './layout/Layout';
import { usersComputed, usersActions } from '../state/mapper';

export default {
	name: 'Users',

	components: {
		Layout,
	},

	data: () => ({
		search: '',
	}),

	computed: {
		...usersComputed,
		headers() {
			return [
				{ text: 'الرقم', value: 'id' },
				{ text: 'اسم المستخدم', value: 'name' },
				{ text: 'رقم التلفون', value: 'phone' },
				{ text: 'البريد الإلكتروني', value: 'email' },
				{ text: 'الفرع', value: 'branch.name' },
				{ text: 'إدارة', value: 'actions', sortable: false },
			];
		},
	},

	async created() {
		try {
			await this.getUsersAction();
		} catch (error) {
			console.log(error);
		}
	},

	methods: {
		...usersActions,
		editUser() {},
		deleteUser() {},
	},
};
</script>

<style lang="scss" scoped></style>
