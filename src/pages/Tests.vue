<template>
	<Layout>
		<v-card>
			<v-toolbar flat color="white">
				<v-toolbar-title>
					الاختبارات
				</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-text-field v-model="search" label="بحث" dense outlined single-line hide-details append-icon="mdi-magnify"></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="primary" dark class="mb-1 ms-2" @click="formDialog = true">
					<v-icon class="d-none d-sm-block me-2">mdi-plus</v-icon>
					<v-icon class="d-sm-none d-block">mdi-plus</v-icon>
					<span class="d-none d-sm-block"> إظافة اختبار </span>
				</v-btn>
				<v-dialog v-model="formDialog" max-width="700px" @click:outside="closeForm">
					<test-form
						ref="testForm"
						:test="updateTest"
						:form-title="formTitle"
						:is-edit="isEditMode"
						@canceled="closeForm"
						@submited="saveTest"
					></test-form>
				</v-dialog>
			</v-toolbar>
		</v-card>
		<v-data-table :headers="headers" :loading="isLoading" :items="tests" sort-by="id" sort-desc="id" class="mt-8 elevation-16" :search="search">
			<template v-slot:[`item.actions`]="{ item }">
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" color="success" @click="editTest(item)" v-on="on">
							<v-icon size="18">mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span> تعديل </span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn dark small min-width="40" class="mx-3" color="error" @click="deleteTest(item)" v-on="on">
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
import TestForm from '../components/tests/test-form';
import ConfirmDailog from '../components/base/confirm-dailog';
import { testsComputed, testsActions } from '../state/mapper';

export default {
	name: 'Tests',

	components: {
		Layout,
		TestForm,
		ConfirmDailog,
	},

	data: () => ({
		search: '',
		isLoading: false,
		formDialog: false,
		isEditMode: false,
		updateTest: {
			name: '',
			price: '',
			test_type_id: '',
		},
	}),

	computed: {
		...testsComputed,
		headers() {
			return [
				{ text: 'الرقم', value: 'id' },
				{ text: 'اسم الاختبار', value: 'name' },
				{ text: 'السعر', value: 'price' },
				{ text: 'نوع الاختبار', value: 'type.name' },
				{ text: 'إدارة', value: 'actions', sortable: false },
			];
		},
		formTitle() {
			return !this.isEditMode ? 'اظافة اختبار' : 'تعديل اختبار';
		},
	},

	async created() {
		try {
			this.isLoading = true;
			await this.getTestsAction();
			this.isLoading = false;
		} catch (error) {
			this.$VAlert.error('عذرا حدث خطأ!');
			this.isLoading = false;
		}
	},

	methods: {
		...testsActions,
		editTest(test) {
			this.isEditMode = true;
			Object.assign(this.updateTest, test);
			this.formDialog = true;
		},
		async deleteTest(test) {
			try {
				const confirmed = await this.$refs.confirm.open('حذف اختبار', 'هل انت متأكد من حذف هذا الاختبار؟');
				if (confirmed) {
					await this.deleteTestAction(test.id);
					this.$VAlert.success('تم حذف الاختبار');
				}
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		async saveTest(testData) {
			try {
				if (this.isEditMode) {
					const testId = this.updateTest.id;
					await this.editTestAction({ testData, testId });
				} else {
					await this.saveTestAction(testData);
				}
				this.$VAlert.success('تم حفظ الاختبار');
			} catch (error) {
				this.$VAlert.error('عذرا حدث خطأ!');
			}
		},
		closeForm() {
			this.$refs.testForm.reset();
			this.isEditMode = false;
			this.formDialog = false;
		},
	},
};
</script>

<style lang="scss" scoped></style>
