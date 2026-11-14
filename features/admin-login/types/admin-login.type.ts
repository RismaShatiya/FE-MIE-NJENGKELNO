export type AdminLoginPayload = {
  username: string;
  password: string;
};

export type AdminLoginResponse = {
  message: string;
  access_token: string;
};