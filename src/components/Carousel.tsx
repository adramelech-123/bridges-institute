import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { slides } from "../data/data"

interface CarouselProps {
    setIsOpen: (open: boolean) => void;
}

const Carousel = ({setIsOpen}: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    

      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
      }, []);
    
      const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      };
    
      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      };

  return (
    <div className="relative h-screen">
        {slides.map((slide, index) => (
            <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900 z-10" />
            <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
                    {slide.description}
                </p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 transform hover:scale-105"
                >
                    Start Your Journey
                </button>
                </div>
            </div>
            </div>
        ))}
        
        <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-purple-600/50 hover:bg-purple-600 transition-colors transform hover:scale-110"
        >
            <ChevronLeft className="h-6 w-6" />
        </button>
        <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-purple-600/50 hover:bg-purple-600 transition-colors transform hover:scale-110"
        >
            <ChevronRight className="h-6 w-6" />
        </button>
    </div>
  )
}

export default Carousel