import { benefits } from "../data/data"


const Benefits = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
            <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl transform hover:-translate-y-2 transition-all duration-300"
            >
                <div className="absolute inset-0">
                <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/70 to-transparent" /></div>
                <div className="relative p-8 h-full flex flex-col justify-end">
                    <benefit.icon className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="text-2xl font-semibold mb-3 text-white">{benefit.title}</h3>
                    <p className="text-gray-200">{benefit.description}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Benefits