export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 text-center group">
        <h2 className="text-3xl font-bold mb-4">
          Empowering Farmers Worldwide
        </h2>
        <p className="mb-6 text-lg">
          Access crucial agricultural insights, tools, and services designed to
          enhance your farming experience.
        </p>
        <button
          className="bg-white text-green-700 font-semibold py-3 px-8 rounded-full shadow-lg 
          hover:bg-gray-100 transition-transform transform ease-in-out 
          duration-300 hover:-translate-y-2 hover:scale-105"
        >
          Get Started
        </button>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-2">Services</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Crop Advisory
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Weather Forecast
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Market Prices
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Farming Tips
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">About Us</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Support</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Follow Us</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-green-600 pt-6">
          <p className="text-sm">
            © {new Date().getFullYear()} AgriConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
