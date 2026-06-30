import * as authApi from "../api/auth";
import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth";
import { storage } from "../utils/storage";

class AuthService {
  async register(data: RegisterRequest) {
    return authApi.register(data);
  }

  async login(credentials: LoginRequest): Promise<User> {
    const tokenResponse = await authApi.login(credentials);

    // Store JWT
    storage.setToken(tokenResponse.access_token);

    // Fetch current user
    return await authApi.getCurrentUser();
  }

  async getCurrentUser(): Promise<User> {
    return authApi.getCurrentUser();
  }

  logout() {
    storage.removeToken();
  }

  isAuthenticated(): boolean {
    return storage.isAuthenticated();
  }
}

export default new AuthService();