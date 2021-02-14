<template>
	<v-combobox
		v-model="selected"
		:items="items"
		:rules="rules"
		small-chips
		dense
		outlined
		multiple
		label="الفحوصات"
		@change="$emit('input', selected)"
	></v-combobox>
</template>

<script>
import { testsActions } from '../../state/mapper';
export default {
	name: 'TestSelect',

	props: {
		value: {
			type: Array,
			default: () => [],
		},
		rules: {
			type: Array,
			default: () => [],
		},
	},

	data: () => ({
		tests: [],
		selected: [],
	}),

	computed: {
		items() {
			return this.tests.map((test) => ({
				text: `${test.name} (${test.price})`,
				value: test.id,
				...test,
			}));
		},
	},

	async created() {
		this.tests = await this.getTestsAction();
	},

	methods: {
		...testsActions,
	},
};
</script>

<style lang="scss" scoped></style>
