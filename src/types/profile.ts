
export type UserRole = 'admin' | 'member';

export interface Profile {
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
}
