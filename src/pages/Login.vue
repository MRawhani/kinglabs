<template>
	<div class="login mx-4">
		<div>
			<h1 class="text-center mb-10 mt-16">King Labs</h1>
			<v-card width="400" class="mx-auto">
				<v-card-title class="justify-center">
					<v-divider class="my-1"></v-divider>
					<div class="mx-4">تسجيل الدخول</div>
					<v-divider class="my-1"></v-divider>
				</v-card-title>
				<v-card-text>
					<v-form ref="loginForm" v-model="validForm" @submit.prevent="loginUser">
						<v-text-field v-model="email" label="البريد الإلكتروني" outlined required :rules="emailRules" />
						<v-text-field
							v-model="password"
							:type="showPass ? 'text' : 'password'"
							label="كلمة المرور"
							outlined
							:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
							required
							:rules="passRules"
							@click:append="showPass = !showPass"
						/>
						<v-checkbox hide-details="auto" class="mt-0 mb-4 pt-0 d-inline-block" label="تذكرني"></v-checkbox>
						<v-btn type="submit" :loading="isLoading" large block color="success">تسجيل الدخول</v-btn>
						<div class="mt-6 text-center">
							<a href="#">هل نسيت كلمة المرور؟</a>
						</div>
					</v-form>
				</v-card-text>
			</v-card>
			<v-snackbar v-model="showError" color="error" right>
				كلمة المرور او البريد الإلكتروني غير صحيح
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
import { authActions } from '../state/mapper.js';
export default {
	data: () => ({
		email: '',
		password: '',
		validForm: false,
		showPass: false,
		showError: false,
		isLoading: false,
		emailRules: [(value) => !!value || 'بريد إلكتروني مطلوب', (value) => /.+@.+\..+/.test(value) || 'يرجى إدخال بريد إلكتروني صحيح'],
		passRules: [(value) => !!value || 'كلمة المرور مطلوبة'],
	}),

	methods: {
		loginAction: authActions.logIn,
		async loginUser() {
			this.isLoading = true;

			try {
				await this.loginAction({
					email: this.email,
					password: this.password,
				});
				this.isLoading = false;
				this.$router.push(this.$route.query.redirectFrom || { name: 'home' });
			} catch (error) {
				this.isLoading = false;
				this.showError = true;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	height: 100vh;
}
</style>
