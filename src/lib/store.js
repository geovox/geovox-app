import create from 'zustand';

const useStore = create((set) => ({
	accountId: null,
	token: null,
	email: null,
	setUser: ({ accountId, token, email }) => set({ accountId, token, email }),
	removeUser: () => set({ accountId: null, token: null, email: null }),
}));

export default useStore;
