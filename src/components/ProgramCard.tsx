import { programs } from "../data/data";
import { Brain, Calendar, Award } from 'lucide-react';

interface ProgramCardProps {
    setIsOpen: (open: boolean) => void;
    setFormData: React.Dispatch<React.SetStateAction<{
        fullName: string;
        phone: string;
        email: string;
        selectedCourses: string[];
    }>>;
}

const ProgramCard = ({setIsOpen, setFormData}: ProgramCardProps) => {
  return (
    <>
        {programs.map((program, index) => (
            <div 
                key={index} 
                className="bg-gray-900 rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500 transition-all duration-300"
            >
                <div className="relative h-64 overflow-hidden">
                <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-400">{program.title}</h3>
                    <p className="text-gray-300 mb-6">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span className="text-gray-300">{program.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-purple-400" />
                        <span className="text-gray-300">{program.level}</span>
                        </div>
                    </div>

                    <h4 className="font-semibold mb-3 text-purple-300">Key Topics:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {program.topics.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                        ))}
                    </ul>
                    
                    <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-gray-300">{program.certification}</span>
                        </div>
                        <button 
                        onClick={() => {
                            setFormData(prev => ({
                            ...prev,
                            selectedCourses: [program.title]
                            }));
                            setIsOpen(true);
                        }}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 transform hover:scale-105"
                        >
                        Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}

export default ProgramCard