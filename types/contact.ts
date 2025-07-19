export type ContactGroup = 'Friends' | 'Work' | 'Family' | '';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  group?: ContactGroup;
}
