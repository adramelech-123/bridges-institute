
import { X } from 'lucide-react';
import { programs } from '../data/data.ts';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    formData: {
        fullName: string;
        phone: string;
        email: string;
        selectedCourses: string[];
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        fullName: string;
        phone: string;
        email: string;
        selectedCourses: string[];
    }>>;
}

const Modal = ({isOpen, setIsOpen, formData, setFormData}: ModalProps) => {

    const handleCourseSelection = (courseTitle: string) => {
        setFormData(prev => ({
          ...prev,
          selectedCourses: prev.selectedCourses.includes(courseTitle)
            ? prev.selectedCourses.filter(title => title !== courseTitle)
            : [...prev.selectedCourses, courseTitle]
        }));
    };
    
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log('Form submitted:', formData);
    //     alert('Thank you for your interest! We will contact you shortly.');

    //     setFormData({
    //       fullName: '',
    //       phone: '',
    //       email: '',
    //       selectedCourses: []
    //     });
    //     setIsOpen(false);
    // };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
          const response = await fetch('http://localhost:5000/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
          });
  
          const data = await response.json();
          if (data.success) {
              alert('Thank you for your interest! A confirmation email has been sent to you.');
          } else {
              alert('Failed to send email. Please try again.');
          }
      } catch (error) {
          console.error('Error submitting form:', error);
          alert('An error occurred. Please try again later.');
      }
  
      setFormData({ fullName: '', phone: '', email: '', selectedCourses: [] });
      setIsOpen(false);
  };
  

    if (!isOpen) return null;
      
  return (
    
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-400">Enroll for any of our Programs</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Select Courses
                </label>
                <div className="space-y-3">
                  {programs.map((program, index) => (
                    <label key={index} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.selectedCourses.includes(program.title)}
                        onChange={() => handleCourseSelection(program.title)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-gray-300">{program.title}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors transform hover:scale-105"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
    </div>
  )
}

export default Modal