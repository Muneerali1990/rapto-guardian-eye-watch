import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setNewContact({ name: '', phone: '' });
    setShowContactModal(false);
    toast.success("Contact added successfully");
  };

  const updateContact = () => {
    if (!editingContact?.name || !editingContact?.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setContacts(contacts.map(c => 
      c.id === editingContact.id ? editingContact : c
    ));
    setEditingContact(null);
    setShowContactModal(false);
    toast.success("Contact updated successfully");
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success("Contact deleted");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <style>{`
        .shadow-effect {
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 245, 212, 0.2);
        }
        .shadow-effect:hover {
          box-shadow: 0 6px 16px rgba(0, 245, 212, 0.4);
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Emergency Contacts
        </h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={() => {
              setNewContact({ name: '', phone: '' });
              setEditingContact(null);
              setShowContactModal(true);
            }}
            className="bg-gradient-to-r from-rapto-highlight to-rapto-accent text-white shadow-effect px-6 py-3 text-lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Contact
          </Button>
        </motion.div>
      </motion.div>
      <div className="grid gap-4">
        {contacts.map(contact => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="shadow-effect"
          >
            <Card className="bg-gray-800/80 border-gray-700 flex justify-between items-center p-5 rounded-xl">
              <div>
                <p className="font-semibold text-gray-200 text-lg">{contact.name}</p>
                <p className="text-sm text-gray-400">{contact.phone}</p>
              </div>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingContact(contact);
                      setShowContactModal(true);
                    }}
                  >
                    <Edit className="h-5 w-5 text-cyan-400" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteContact(contact.id)}
                  >
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="bg-gray-800 border-gray-700 shadow-effect">
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-2xl">{editingContact ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={editingContact ? editingContact.name : newContact.name}
              onChange={(e) => {
                const value = e.target.value;
                editingContact 
                  ? setEditingContact({ ...editingContact, name: value })
                  : setNewContact({ ...newContact, name: value });
              }}
              className="bg-gray-700 text-gray-200 border-gray-600 text-lg py-3"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={editingContact ? editingContact.phone : newContact.phone}
              onChange={(e) => {
                const value = e.target.value;
                editingContact 
                  ? setEditingContact({ ...editingContact, phone: value })
                  : setNewContact({ ...newContact, phone: value });
              }}
              className="bg-gray-700 text-gray-200 border-gray-600 text-lg py-3"
            />
          </div>
          <DialogFooter>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                onClick={() => setShowContactModal(false)} 
                className="text-gray-200 text-lg py-3 px-6"
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={editingContact ? updateContact : addContact}
                className="bg-gradient-to-r from-rapto-highlight to-rapto-accent text-white shadow-effect text-lg py-3 px-6"
              >
                Save
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsPage;