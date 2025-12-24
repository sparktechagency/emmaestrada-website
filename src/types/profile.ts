// types/profile.ts
export interface Profile {
  _id: string;
  name: string;
  role: "USER" | "ADMIN";
  email: string;
  image: string;
  status: "active" | "inactive";
  verified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: Profile;
}
