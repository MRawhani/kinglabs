<template>
	<Layout>
		<div class="d-flex justify-space-between">
			<div class="">
				<h1 class="text-h4">الفحوصات</h1>
			</div>
			<v-btn color="primary" dark class="mb-1 ms-2" @click="formDialog = true">
				<v-icon class="d-none d-sm-block me-2">mdi-plus</v-icon>
				<v-icon class="d-sm-none d-block">mdi-plus</v-icon>
				<span class="d-none d-sm-block"> إظافة فحص </span>
			</v-btn>
		</div>
		<v-divider class="my-4"></v-divider>
		<v-dialog v-model="formDialog" max-width="700px" @click:outside="closeForm">
			<test-form
				ref="testForm"
				:user="updateTest"
				:form-title="formTitle"
				:is-edit="isEditMode"
				@canceled="closeForm"
				@submited="saveTest"
			></test-form>
		</v-dialog>
		<v-card link class="py-4 px-2" max-width="250">
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
import TestForm from '../components/tests/test-form';

export default {
	name: 'Tests',

	components: {
		Layout,
		TestForm,
	},

	data: () => ({
		formDialog: false,
		isEditMode: false,
		updateTest: {
			name: '',
			price: '',
		},
	}),

	computed: {
		formTitle() {
			return !this.isEditMode ? 'اظافة فحص' : 'تعديل فحص';
		},
	},

	methods: {
		saveTest() {},
		editTest(test) {
			this.isEditMode = true;
			Object.assign(this.updateTest, test);
			this.formDialog = true;
		},
		deleteTest() {},
		closeForm() {
			this.$refs.testForm.reset();
			this.isEditMode = false;
			this.formDialog = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.test {
	color: #2a4f66 !important;
}
</style>
