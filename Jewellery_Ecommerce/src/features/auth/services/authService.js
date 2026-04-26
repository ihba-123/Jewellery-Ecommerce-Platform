export const authService = {
  login: async (email) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, name: 'John Doe', email },
          token: 'fake-jwt-token'
        });
      }, 500);
    });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};
