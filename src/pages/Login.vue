<template>
	<div class="login">
		<div>
			<h1 class="text-center mb-10 mt-5">Title</h1>
			<v-card width="400" class="mx-auto">
				<v-card-title class="display-1 justify-center mb-3">
					Your Account
				</v-card-title>
				<v-card-subtitle class="subtitle-1 text-center ">
					Login Your Account
				</v-card-subtitle>
				<v-card-text>
					<v-form ref="loginForm" v-model="validForm" @submit.prevent="loginUser">
						<v-text-field v-model="email" label="Email" outlined required :rules="emailRules" />
						<v-text-field
							v-model="password"
							:type="showPass ? 'text' : 'password'"
							label="Password"
							outlined
							:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
							required
							:rules="passRules"
							@click:append="showPass = !showPass"
						/>

						<div class="d-flex">
							<v-spacer></v-spacer>
							<v-btn type="submit" :disabled="!validForm" color="primary" depressed>Login</v-btn>
						</div>
					</v-form>
				</v-card-text>
			</v-card>
			<v-snackbar v-model="showError" color="error" right>
				Incorrect email or password!
				<template v-slot:action="{ attrs }">
					<v-btn dark text icon v-bind="attrs" @click="showError = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</template>
			</v-snackbar>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			validForm: false,
			showPass: false,
			showError: false,
			errorMessage: 'invalidLogin',
			emailRules: [(value) => !!value || 'Email is required!', (value) => /.+@.+\..+/.test(value) || 'Add a valid email!'],
			passRules: [(value) => !!value || 'Password too short!'],
		};
	},
	methods: {
		loginUser() {},
	},
};
</script>

<style lang="scss" scoped>
.login {
	height: 100vh;
}
</style>
