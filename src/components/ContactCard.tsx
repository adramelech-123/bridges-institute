import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
  icon: LucideIcon;  
  heading: string;
  contactItem: string;
}

const ContactCard = ({icon: Icon, heading, contactItem}: ContactCardProps) => {
  return (
    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2">
        <Icon className="h-12 w-12 mb-6 text-purple-300 mx-auto" />
        <p className="text-lg font-semibold mb-2">{heading}</p>
        <p className='italic text-purple-200'>{contactItem}</p>
    </div>
  )
}

export default ContactCard