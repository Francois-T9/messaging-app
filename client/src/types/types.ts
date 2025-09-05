export type UserData = {
  userId: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

export type UserStore = {
  currentUser: UserData;
  usersArray: UserData[];
  login: (input: LoginInput) => Promise<LoginOutput | UserData>;
  signup: (input: LoginInput) => Promise<LoginOutput | UserData>;
  logout: () => Promise<boolean>;
};
export type LoginInput = {
  name: string;
  password: string;
};
export type LoginOutput = {
  error: string;
};
