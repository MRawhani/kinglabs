import { mapActions, mapGetters, mapState } from 'vuex';

// auth helpers
export const authComputed = {
	...mapState('global/auth', ['currentUser']),
	...mapGetters('global/auth', ['isLoggedIn']),
};

export const authActions = {
	...mapActions('global/auth', ['logIn', 'logOut']),
};
