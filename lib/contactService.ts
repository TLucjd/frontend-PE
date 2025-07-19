export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  group?: string;
};

type CreateContactDto = Omit<Contact, 'id'>;
type UpdateContactDto = Partial<Omit<Contact, 'id'>>;

function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch(`${BASE_URL}/contacts`);
  return handleResponse<Contact[]>(res);
}

export async function getContacts(
  name?: string,
  group?: string,
  sort?: 'asc' | 'desc'
): Promise<Contact[]> {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (group) params.append('group', group);
  if (sort) params.append('sort', sort);

  const res = await fetch(`${BASE_URL}/contacts?${params.toString()}`);
  return handleResponse<Contact[]>(res);
}

export async function getContact(id: string): Promise<Contact> {
  const res = await fetch(`${BASE_URL}/contacts/${id}`);
  return handleResponse<Contact>(res);
}

export async function createContact(data: CreateContactDto): Promise<Contact> {
  const res = await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Contact>(res);
}

export async function updateContact(id: string, data: UpdateContactDto): Promise<Contact> {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Contact>(res);
}

export async function deleteContact(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string }>(res);
}