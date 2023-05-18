import storage from '@/requests/storage';

export default {
  namespaced: true,
  state: {
    photoPath: null,
  },
  getters: {
    getStoragePostPhoto: (s) => s.photoPath,
  },
  mutations: {
    setStoragePostPhoto: (s, value) => {
      s.photoPath = value;
    },
  },
  actions: {
    async apiStoragePostPhoto({ commit }, file) {
      const data = new FormData();
      data.append('file', file);
      const response = await storage.api(data);
      commit('setStoragePostPhoto', response.data.photoPath);
    },
  },
};
