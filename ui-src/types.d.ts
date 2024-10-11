export interface ChildrenProviderProps {
  children: React.ReactNode;
}

export interface user {
  userName: string | null;
  email: string | null;
  token: string | null;
  figmaId: string | null;
}
export type UserContextType = {
  user: user;
  setUser: (user: user) => void;
};

export type FileLinkContextType = {
  fileLink: string | null;
  setFileLink: (fileLink: string | null) => void;
};

// FolderContext types
export type FolderContextType = {
  selectedFolder: string | null;
  setSelectedFolder: (folder: string | null) => void;
};

export interface output {
  selection: string;
  framework: string;
  html: string;
  css: string;
  animationCss: string;
  js: string;
  react: string;
  nodeName: string;
  manualTag: boolean;
}
export type OutputContextType = {
  output: output;
  setOutput: (output: output) => void;
};

export interface subscription {
  subscriptionType: string;
  designsLeft: number;
  subscriptionTime: Date | null;
  expiryTime: Date | null;
  duration: number | null;
}
