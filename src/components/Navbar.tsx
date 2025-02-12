import logo from "../images/icon-bridges.png"

const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={logo} width={40}/>
                    <span className="text-xl font-bold text-white">Bridges Institute</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#programs" className="hover:text-purple-400 transition-colors">Programs</a>
                    <a href="#benefits" className="hover:text-purple-400 transition-colors">Benefits</a>
                    <a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a>
                    <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
                </div>
            </div>
        </nav>
    )
  }
  
  export default Navbar