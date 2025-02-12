import { testimonials } from "../data/data"

const Testimonials = () => {
  return (
    <>
        {testimonials.map((testimonial, index) => (
            <div 
                key={index}
                className="bg-gray-800 p-8 rounded-xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2"
            >
                <div className="flex items-center space-x-4 mb-6">
                <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-lg text-purple-400">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
                </div>
                <p className="text-gray-300 italic">{testimonial.text}</p>
            </div>
        ))}
    </>
  )
}

export default Testimonials