'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContact } from '../../lib/contactService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export default function CreateContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    group: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert('Name and Email are required');
    await createContact(form);
    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Create New Contact</h1>

      <div>
        <Label>Name</Label>
        <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
      </div>

      <div>
        <Label>Phone</Label>
        <Input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
      </div>

      <div>
        <Label>Group</Label>
        <Select onValueChange={(value) => handleChange('group', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Friends">Friends</SelectItem>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSubmit}>Create</Button>
    </div>
  );
}
