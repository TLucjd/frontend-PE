'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getContacts, deleteContact, Contact } from '@/lib/contactService'

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const data = await getContacts(query)
      setContacts(data)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this contact?')
    if (!confirmDelete) return

    try {
      await deleteContact(id)
      setContacts((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error('Failed to delete contact:', err)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [query])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📇 Contact Manager</h1>
        <Link href="/create">
          <Button>Add Contact</Button>
        </Link>
      </div>

      <Input
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4"
      />

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500 italic">No contacts found.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-4 flex justify-between items-start">
                <div>
                  <h2 className="font-medium text-lg">{contact.name}</h2>
                  <p>{contact.email}</p>
                  {contact.phone && <p>{contact.phone}</p>}
                  {contact.group && (
                    <p className="text-sm text-muted-foreground">Group: {contact.group}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <Link href={`/edit/${contact.id}`}>
                    <Button variant="outline" size="sm">✏️ Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
