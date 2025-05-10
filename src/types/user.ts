import { ResponseProps } from "@/types/response";

export enum Role {
  admin,
  user,
}

export enum Gender {
  male,
  female,
  other,
}

export interface UserProps {
  id: string;
  email: string;
  username: string;
  is_activated: boolean;
  is_2fa: boolean;
  role: Role;
  last_active: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  profile: {
    first_name: string;
    last_name: string;
    full_name: string;
    avatar_url: string;
    gender: Gender | null;
    phone_num: string | null;
    address: string | null;
    birth_date: Date | null;
  };
}

export interface GetUserResponseProps extends ResponseProps {
  data: UserProps;
}
