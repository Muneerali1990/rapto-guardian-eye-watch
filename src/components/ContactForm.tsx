
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/components/ui/sonner';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      });
      setName('');
      setEmail('');
      setMessage('');
      setLoading(false);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
            className="w-full"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help you?"
          rows={5}
          required
          className="w-full"
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading}
        className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white py-6 px-8 rounded-xl hover:shadow-glow transition-all w-full md:w-auto"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
