export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
  theme: {
    id: string;
    name: string;
    bg: string;
    text: string;
    button: string;
  }
};

export type UserHandle = Pick<User, "handle" | "name"  | "description" | "image">
export type RegisterForm = Pick<User, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type ProfileForm = Pick<User, "handle" | "description" | "theme">;

export type SocialNetwork= {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
}

export type SocialLinks = Pick<SocialNetwork, "name" | "url" | "enabled">