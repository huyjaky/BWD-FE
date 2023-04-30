import { authApi } from '@/api-client';
import { LoginPayload } from '@/models';
import { PublicConfiguration } from 'swr/_internal';

const useAuth = (options?: Partial<PublicConfiguration>) => {
  const login = async ({ username, password }: LoginPayload) => {
    const userIsExist = await authApi.login({
      username: username,
      password: password
    });
    return userIsExist.data;
  };

  const logout = async () => {
    await authApi.logout();
  };

  const refreshToken = async (refreshToken: string) => {
    await authApi.refreshToken(refreshToken);
  };

  return {
    login,
    logout,
    refreshToken
  };
};

export default useAuth;
