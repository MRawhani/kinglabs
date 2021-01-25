<template>
	<v-dialog v-model="dialog" max-width="350" @keydown.esc="close">
		<v-card>
			<v-card-title class="headline">{{ $t(title) }}</v-card-title>
			<v-card-text v-show="!!message">{{ $t(message) }}</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="close">{{ $t('actions.close') }}</v-btn>
				<v-btn color="error darken-1" text @click="agree">{{ $t(confirmText) }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		confirmText: {
			type: String,
			default: 'actions.delete',
		},
	},
	data: () => ({
		dialog: false,
		confirm: null,
		cancel: null,
		message: null,
		title: null,
	}),
	methods: {
		open(title, message) {
			this.dialog = true;
			this.title = title;
			this.message = message;
			return new Promise((resolve, reject) => {
				this.confirm = resolve;
				this.cancel = reject;
			});
		},
		agree() {
			this.confirm(true);
			this.dialog = false;
		},
		close() {
			this.confirm(false);
			this.dialog = false;
		},
	},
};
</script>

<style lang="scss" scoped></style>
