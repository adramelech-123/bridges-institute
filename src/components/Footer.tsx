import logo from "../images/icon-bridges.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-purple-500/20">
        <div className="container mx-auto px-6">
            <div className="flex items-center justify-center space-x-2 mb-8">
                <img src={logo} width={40}/>
                <span className="text-xl font-bold text-white">Bridges Institute</span>
            </div>
            <p className="text-center">
                © 2025 Bridges Institute for Professional Development. All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer