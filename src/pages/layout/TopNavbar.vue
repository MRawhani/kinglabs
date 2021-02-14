<template>
	<v-app-bar app fixed color="white" clipped-right elevation="10">
		<div class="d-flex align-center justify-space-between d-block top-bar">
			<div class="d-flex align-center">
				<v-app-bar-nav-icon class="d-lg-none d-block" @click.stop="$emit('meunClicked')"></v-app-bar-nav-icon>
				<v-toolbar-title class="text-h5 ms-2">King lab</v-toolbar-title>
			</div>
			<img src="../../assets/logo.jpg" width="130" />
			<div>
				<v-menu offset-y transition="scale-transition">
					<template v-slot:activator="{ on }">
						<v-btn fab small medium outlined depressed color="primary">
							<v-avatar v-on="on">
								<v-icon>mdi-account</v-icon>
							</v-avatar>
						</v-btn>
					</template>
					<v-list nav dense>
						<v-list-item-group color="primary">
							<!-- <v-list-item>
								<v-list-item-icon>
									<v-icon>mdi-account-box-outline</v-icon>
								</v-list-item-icon>
								<v-list-item-title>الملف الشخصي</v-list-item-title>
							</v-list-item> -->
							<v-list-item to="/logout">
								<v-list-item-icon>
									<v-icon>mdi-logout-variant</v-icon>
								</v-list-item-icon>
								<v-list-item-title>تسجيل الخروج</v-list-item-title>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-menu>
			</div>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	name: 'TopNavbar',
};
</script>

<style lang="scss" scoped>
.top-bar {
	width: 100%;
}
</style>
