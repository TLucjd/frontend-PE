'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getContact, updateContact } from '@/lib/contactService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export default function EditContactPage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    group: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (typeof params.id === 'string') {
        try {
          const data = await getContact(params.id);
          if (data) {
            setForm({
              name: data.name ?? '',
              email: data.email ?? '',
              phone: data.phone ?? '',
              group: data.group ?? '',
            });
          }
        } catch (error) {

          console.error('Failed to fetch contact', error);
        }
      }
    };
    fetchData();
  }, [params.id]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert('Name and Email are required');
      return;
    }

    try {
      await updateContact(params.id as string, form);
      router.push('/');
    } catch (error) {
      console.error('Failed to update contact', error);
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">✏️ Edit Contact</h1>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          placeholder="Enter phone"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Group</Label>
        <Select value={form.group} onValueChange={(value) => handleChange('group', value)}>
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

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => router.push('/')}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>💾 Update</Button>
      </div>
    </div>
  );
}
