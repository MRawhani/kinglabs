<template>
	<Layout>
		<v-card>
			<v-toolbar flat color="white">
				<v-toolbar-title>
					العملاء
				</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-text-field v-model="search" label="بحث" dense outlined single-line hide-details append-icon="mdi-magnify"></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="primary" dark class="mb-1 ms-2" @click="formDialog = true">
					<v-icon class="d-none d-sm-block me-2">mdi-plus</v-icon>
					<v-icon class="d-sm-none d-block">mdi-plus</v-icon>
					<span class="d-none d-sm-block"> إظافة دفعة </span>
				</v-btn>
				<v-dialog v-model="formDialog" max-width="700px" @click:outside="closeForm">
					<batch-form
						ref="batchForm"
						:form-title="formTitle"
						:is-edit="isEditMode"
						:batch="updateBatch"
						@submited="saveBatch"
						@canceled="closeForm"
					></batch-form>
				</v-dialog>
			</v-toolbar>
		</v-card>
		<v-data-table :headers="headers" :loading="isLoading" :items="batches" sort-by="id" sort-desc class="mt-8 elevation-16" :search="search">
			<template v-slot:[`item.actions`]="{ item }">
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" color="success" @click="editBatch(item)" v-on="on">
							<v-icon size="18">mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span> تعديل </span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" class="mx-3" color="error" @click="deleteBatch(item)" v-on="on">
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
import { batchesComputed, batchesActions } from '../state/mapper';
import BatchForm from '../components/companies/batch-form';

export default {
	name: 'CompanyAgents',

	components: {
		Layout,
		ConfirmDailog,
		BatchForm,
	},

	data: () => ({
		search: '',
		isLoading: false,
		formDialog: false,
		isEditMode: false,
		updateBatch: {
			name: '',
			identifier: '',
		},
	}),

	computed: {
		...batchesComputed,
		headers() {
			return [
				{ text: 'الرقم', value: 'id' },
				{ text: 'اسم الدفعة', value: 'name' },
				{ text: 'رقم التعريف', value: 'identifier' },
				{ text: 'عدد العملاء', value: 'agents_count' },
				{ text: 'إدارة', value: 'actions', sortable: false },
			];
		},
		formTitle() {
			return !this.isEditMode ? 'اظافة دفعة' : 'تعديل دفعة';
		},
	},

	async created() {
		try {
			this.isLoading = true;
			await this.getBatchesAction();
			this.isLoading = false;
		} catch (error) {
			this.$VAlert.error('عذرا حدث خطأ!');
			this.isLoading = false;
		}
	},

	methods: {
		...batchesActions,
		async editBatch(batch) {
			this.isEditMode = true;
			const data = await this.getBatchAction(batch.id);
			console.log(data);
			Object.assign(this.updateBatch, data);
			this.formDialog = true;
		},
		async deleteBatch(batch) {
			try {
				const confirmed = await this.$refs.confirm.open('حذف دفعة', 'هل انت متأكد من حذف هذا الدفعة؟');
				if (confirmed) {
					await this.deleteBatchAction(batch.id);
					this.$VAlert.success('تم حذف الدفعة');
				}
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		async saveBatch(batchData) {
			console.log(batchData);

			try {
				if (this.isEditMode) {
					const batchId = this.updateBatch.id;
					await this.editBatchAction({ batchData, batchId });
				} else {
					await this.saveBatchAction(batchData);
				}
				this.$VAlert.success('تم حفظ الفرع');
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		closeForm() {
			this.$refs.batchForm.reset();
			this.isEditMode = false;
			this.formDialog = false;
		},
	},
};
</script>

<style lang="scss" scoped></style>
