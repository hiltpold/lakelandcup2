export interface User {
  id: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  role: string;
  password: string;
  is_validated: boolean;
}
