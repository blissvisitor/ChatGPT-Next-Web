// auth.ts

export const isAuthenticated = (): boolean => {
  // 检查用户是否已经登录
  // 例如，检查 store 中是否有用户信息
  return false;
};

export const redirectIfNotAuthenticated = (): Boolean => {
  return isAuthenticated();
};
