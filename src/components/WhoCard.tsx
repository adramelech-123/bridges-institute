import { LucideIcon } from 'lucide-react';

interface WhoCardProps {
  icon: LucideIcon;  // Accepts any Lucide icon component
  description: string;
}

const WhoCard = ({ icon: Icon, description }: WhoCardProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl hover:shadow-xl hover:shadow-purple-300 transition-all duration-300 transform hover:-translate-y-2">
        <Icon className="h-12 w-12 text-purple-400 mb-4" />
        <p className="text-gray-300">{description}</p>
    </div>
  )
}

export default WhoCard