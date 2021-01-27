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
				<v-btn color="primary" dark class="mb-1 ms-2" @click="formDialog = true">
					<v-icon class="d-none d-sm-block me-2">mdi-plus</v-icon>
					<v-icon class="d-sm-none d-block">mdi-plus</v-icon>
					<span class="d-none d-sm-block"> إظافة مستخدم </span>
				</v-btn>
				<v-dialog v-model="formDialog" max-width="700px" @click:outside="closeForm">
					<user-form
						ref="userForm"
						:user="updateUser"
						:form-title="formTitle"
						:is-edit="isEditMode"
						@canceled="closeForm"
						@submited="saveUser"
					></user-form>
				</v-dialog>
			</v-toolbar>
		</v-card>
		<v-data-table :headers="headers" :loading="isLoading" :items="users" sort-by="id" class="mt-8 elevation-16" :search="search">
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
		<confirm-dailog ref="confirm"></confirm-dailog>
	</Layout>
</template>

<script>
import Layout from './layout/Layout';
import UserForm from '../components/users/user-form';
import ConfirmDailog from '../components/base/confirm-dailog';
import { usersComputed, usersActions } from '../state/mapper';

export default {
	name: 'Users',

	components: {
		Layout,
		UserForm,
		ConfirmDailog,
	},

	data: () => ({
		search: '',
		isLoading: false,
		formDialog: false,
		isEditMode: false,
		updateUser: {
			name: '',
			email: '',
			phone: '',
			job_title: '',
			branch_id: '',
			password: '',
		},
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
		formTitle() {
			return !this.isEditMode ? 'اظافة مستخدم' : 'تعديل مستخدم';
		},
	},

	async created() {
		try {
			this.isLoading = true;
			await this.getUsersAction();
			this.isLoading = false;
		} catch (error) {
			this.$VAlert.error('عذرا حدث خطأ!');
			this.isLoading = false;
		}
	},

	methods: {
		...usersActions,
		editUser(user) {
			this.isEditMode = true;
			Object.assign(this.updateUser, user);
			this.formDialog = true;
		},
		async deleteUser(user) {
			try {
				const confirmed = await this.$refs.confirm.open('حذف مستخدم', 'هل انت متأكد من حذف هذا المستخدم؟');
				if (confirmed) {
					await this.deleteUserAction(user.id);
					this.$VAlert.success('تم حذف المستخدم');
				}
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		async saveUser(userData) {
			try {
				if (this.isEditMode) {
					const userId = this.updateUser.id;
					await this.editUserAction({ userData, userId });
				} else {
					await this.saveUserAction(userData);
				}
				this.$VAlert.success('تم حفظ المستخدم');
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		closeForm() {
			this.$refs.userForm.reset();
			this.isEditMode = false;
			this.formDialog = false;
		},
	},
};
</script>

<style lang="scss" scoped></style>
