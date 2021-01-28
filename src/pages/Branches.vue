<template>
	<Layout>
		<v-card>
			<v-toolbar flat color="white">
				<v-toolbar-title>
					الفروع
				</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-text-field v-model="search" label="بحث" dense outlined single-line hide-details append-icon="mdi-magnify"></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="primary" dark class="mb-1 ms-2" @click="formDialog = true">
					<v-icon class="d-none d-sm-block me-2">mdi-plus</v-icon>
					<v-icon class="d-sm-none d-block">mdi-plus</v-icon>
					<span class="d-none d-sm-block"> إظافة فرع </span>
				</v-btn>
				<v-dialog v-model="formDialog" max-width="700px" @click:outside="closeForm">
					<branch-form
						ref="branchForm"
						:branch="updateBranch"
						:form-title="formTitle"
						:is-edit="isEditMode"
						@canceled="closeForm"
						@submited="saveBranch"
					></branch-form>
				</v-dialog>
			</v-toolbar>
		</v-card>
		<v-data-table
			:headers="headers"
			:loading="isLoading"
			:items="branches"
			sort-by="id"
			sort-desc="id"
			class="mt-8 elevation-16"
			:search="search"
		>
			<template v-slot:[`item.actions`]="{ item }">
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" color="success" @click="editBranch(item)" v-on="on">
							<v-icon size="18">mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span> تعديل </span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" class="mx-3" color="error" @click="deleteBranch(item)" v-on="on">
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
import ConfirmDailog from '../components/base/confirm-dailog';
import { branchesComputed, branchesActions } from '../state/mapper';
import BranchForm from '../components/branches/branch-form';

export default {
	name: 'Users',

	components: {
		Layout,
		BranchForm,
		ConfirmDailog,
	},

	data: () => ({
		search: '',
		isLoading: false,
		formDialog: false,
		isEditMode: false,
		updateBranch: {
			name: '',
			phone: '',
			address: '',
		},
	}),

	computed: {
		...branchesComputed,
		headers() {
			return [
				{ text: 'الرقم', value: 'id' },
				{ text: 'اسم الفرع', value: 'name' },
				{ text: 'رقم التلفون', value: 'phone' },
				{ text: 'العنوان', value: 'address' },
				{ text: 'إدارة', value: 'actions', sortable: false },
			];
		},
		formTitle() {
			return !this.isEditMode ? 'اظافة فرع' : 'تعديل فرع';
		},
	},

	async created() {
		try {
			this.isLoading = true;
			await this.getBranchesAction();
			this.isLoading = false;
		} catch (error) {
			this.$VAlert.error('عذرا حدث خطأ!');
			this.isLoading = false;
		}
	},

	methods: {
		...branchesActions,
		editBranch(branch) {
			this.isEditMode = true;
			Object.assign(this.updateBranch, branch);
			this.formDialog = true;
		},
		async deleteBranch(branch) {
			try {
				const confirmed = await this.$refs.confirm.open('حذف مستخدم', 'هل انت متأكد من حذف هذا الفرع؟');
				if (confirmed) {
					await this.deleteBranchAction(branch.id);
					this.$VAlert.success('تم حذف الفرع');
				}
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		async saveBranch(branchData) {
			try {
				if (this.isEditMode) {
					const branchId = this.updateBranch.id;
					await this.editBranchAction({ branchData, branchId });
				} else {
					await this.saveBranchAction(branchData);
				}
				this.$VAlert.success('تم حفظ الفرع');
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		closeForm() {
			this.$refs.branchForm.reset();
			this.isEditMode = false;
			this.formDialog = false;
		},
	},
};
</script>

<style lang="scss" scoped></style>
