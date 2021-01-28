<template>
	<v-card>
		<v-form ref="testForm" v-model="validForm" @submit.prevent="submited">
			<v-card-title>
				<span class="headline">{{ formTitle }}</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-row>
					<v-col class="py-0" sm="6" cols="12">
						<v-text-field v-model="formData.name" :rules="rules.name" dense label="اسم الاختبار" outlined required></v-text-field>
					</v-col>
					<v-col class="py-0" sm="6" cols="12">
						<v-text-field v-model="formData.price" :rules="rules.price" dense label="السعر" outlined required></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="py-0" sm="6" cols="12">
						<v-select
							v-model="formData.test_type_id"
							:rules="rules.test_type_id"
							dense
							label="نوع الاختبار"
							:items="testTypes"
							outlined
							required
						></v-select>
					</v-col>
				</v-row>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="close">اغلاق</v-btn>
				<v-btn color="blue darken-1" type="submit" :disabled="!validForm" text>حفظ</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
import { typesActions } from '../../state/mapper';

export default {
	name: 'testForm',
	props: {
		formTitle: {
			type: String,
			default: 'Make new test',
		},
		test: {
			type: Object,
			default: () => ({
				name: '',
				price: '',
				test_type_id: '',
			}),
		},
		isEdit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			validForm: false,
			showPass: false,
			types: [],
		};
	},
	computed: {
		rules() {
			return {
				name: [(val) => !!val || 'اسم الاختبار مطلوب'],
				price: [(val) => !!val || 'السعر مطلوب'],
				test_type_id: [(val) => !!val || 'يرجى تحديد النوع'],
			};
		},
		formData() {
			return this.test;
		},
		testTypes() {
			return this.types.map((type) => ({
				value: type.id,
				text: type.name,
			}));
		},
	},
	async created() {
		try {
			this.types = await this.loadTestTypes();
		} catch (error) {
			this.$VAlert.error('');
		}
	},
	methods: {
		loadTestTypes: typesActions.getTestTypesAction,
		submited() {
			this.$emit('submited', {
				name: this.formData.name,
				price: this.formData.price,
				test_type_id: this.formData.test_type_id,
			});

			this.close();
		},
		close() {
			this.$refs.testForm.reset();
			this.$emit('canceled');
		},
		reset() {
			this.$refs.testForm.reset();
		},
	},
};
</script>

<style lang="scss" scoped></style>
