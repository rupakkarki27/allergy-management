import { IUser } from "@allergy-management/models";
import api from "../api";

export interface AuthDto {
  email: string;
  password: string;
}

class Auth {
  async signUp(body: AuthDto) {
    const response = await api.post<IUser>("/auth/signup", {
      ...body,
      role: "user",
    });

    return response.data;
  }

  async signIn(body: AuthDto) {
    const response = await api.post<{ accessToken: string }>(
      "/auth/signin",
      body
    );

    return response.data;
  }
}

const AuthService = new Auth();

export default AuthService;
