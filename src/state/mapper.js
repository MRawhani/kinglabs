import { mapActions, mapGetters, mapState } from 'vuex';

// auth helpers
export const authComputed = {
	...mapState('global/auth', ['currentUser']),
	...mapGetters('global/auth', ['isLoggedIn']),
};

export const authActions = {
	...mapActions('global/auth', ['logIn', 'logOut']),
};

// Users helpers
export const usersComputed = {
	...mapState('users', ['users']),
};

export const usersActions = {
	...mapActions('users', {
		getUsersAction: 'getUsersList',
		saveUserAction: 'saveUser',
		deleteUserAction: 'deleteUser',
		editUserAction: 'editUser',
		suspendUserAction: 'suspendUser',
		activateUserAction: 'activateUser',
	}),
};

// Branches helpers
export const branchesComputed = {
	...mapState('branches', ['branches']),
};

export const branchesActions = {
	...mapActions('branches', {
		getBranchesAction: 'getBranchesList',
		saveBranchAction: 'saveBranch',
		deleteBranchAction: 'deleteBranch',
		editBranchAction: 'editBranch',
	}),
};
