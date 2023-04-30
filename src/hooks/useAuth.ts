import { authApi } from "@/api-client"
import { PublicConfiguration } from "swr/_internal";

const useAuth = (options?: Partial<PublicConfiguration>) => {

  const login = async (username: string, password: string) => {
    await authApi.login({
      username: username,
      password: password
    })
  }

  const logout = async () => {
    await authApi.logout();
  }

  return {
    login,
    logout
  }
}

export default useAuth;