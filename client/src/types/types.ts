export type UserData = {
  userId: number;
  name: string;
  accessToken: string;
};

export type UserList = {
  id: number;
  name: string;
};

export type AuthStore = {
  currentUser: UserData;
  login: (input: LoginInput) => Promise<LoginOutput | UserData>;
  signup: (input: LoginInput) => Promise<LoginOutput | UserData>;
  logout: () => Promise<boolean>;
};

export type UserStore = {
  allUsers: UserList[];
  getAllUsers: (currentUser: UserData) => Promise<UserList[]>;
  getUsernameById: (userId: number, currentUser: UserData) => Promise<string>;
};

export type Message = {
  senderId: number;
  content: string;
  createdAt: string;
};

export type MessagesStore = {
  receivedMessages: Message[];
  getMessages: (id: number, accessToken: string) => Promise<Message[]>;
  messagesError?: string;
};
export type LoginInput = {
  name: string;
  password: string;
};
export type LoginOutput = {
  error: string;
};

export type MessagesComponentProps = {
  currentUser: UserData;
  receivedMessages: Message[];
};

export type SidebarMenuState = {
  dashboardChild: string;
  setDashboardChild: (selection: string) => void;
};

export type GetMessagesType = {
  user: UserData;
  partnerId: number;
};

export type ConversationState = {
  partner: UserList | null;
  setPartner: (user: UserList) => void;
  getMessagesFromPartner: (
    user: UserData,
    partnerId: number
  ) => Promise<Message[]>;
  chatError?: string;
};

export type ChatProps = {
  partner: UserList;
};
