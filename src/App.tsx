import { useState } from 'react';
import { Brain, Building2, GraduationCap, MailIcon, MapPin, Phone, Users} from 'lucide-react';
import Modal from './components/Modal';
import ProgramCard from './components/ProgramCard';
import Testimonials from './components/Testimonials';
import ContactCard from './components/ContactCard';
import Carousel from './components/Carousel';
import WhoCard from './components/WhoCard';
import Benefits from './components/Benefits';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedCourses: [] as string[]
  });


  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} formData={formData} setFormData={setFormData}/>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="relative">
          <Navbar/>
          <Carousel setIsOpen={setIsModalOpen}/>
        </header>

        <section className="py-24 bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-900/10 z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-purple-400">Our Mission</h2>
              <p className="text-xl text-gray-800 leading-relaxed">
                We are committed to providing high-quality, practical, and industry-relevant training that equips professionals with the skills they need to enhance productivity, drive informed decision-making, and gain a competitive edge in their careers.
              </p>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Why Choose Bridges?</h2>
            <Benefits/>
          </div>
        </section>

        <section id="programs" className="py-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Our Training Programs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ProgramCard setIsOpen={setIsModalOpen} setFormData={setFormData}/>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">What Our Students Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Testimonials/>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Who Can Benefit?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <WhoCard icon={Users} description='Business professionals looking to enhance analytical and technical skills'/>
              <WhoCard icon={Brain} description='Data analysts and financial analysts seeking advanced training'/>
              <WhoCard icon={Building2} description='IT professionals and software developers expanding their expertise'/>
              <WhoCard icon={GraduationCap} description='Students and job seekers aiming to boost employability'/>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-gray-900" />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-bold text-center mb-16">Get Started Today!</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-center mb-12 text-xl">
                Take the next step in your professional journey with <b>Bridges</b>. Whether you're an individual looking to upskill or an organization seeking specialized training for your workforce, we have the right program for you.
              </p>
              <div className="grid md:grid-cols-3 gap-12 text-center">
                <ContactCard icon={Phone} heading='Call or WhatsApp' contactItem='+263771326080'/>
                <ContactCard icon={MapPin} heading='Location' contactItem='Harare, Zimbabwe'/>
                <ContactCard icon={MailIcon} heading='Email Us' contactItem='bridgesinstitute@gmail.com'/>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
    </>
    
  );
}

export default App;