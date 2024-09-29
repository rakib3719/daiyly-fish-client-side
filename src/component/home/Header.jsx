import { useState } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <div
        className={`md:flex flex-col md:flex-row justify-between items-center p-4 bg-[#aa1936] text-sm ${!isVisible ? 'hidden' : 'flex'}`}
      >
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="bg-white py-3 rounded px-6">
            Call us: <a href="tel:+1234567890" className="font-semibold  text-[#ef4281]">+880 01400-056928
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <a
              href="https://www.facebook.com/dailyfish24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877f2] text-white px-4 py-2 rounded-lg hover:bg-[#1558a6] transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                <path d="M22 12.2c0-5.5-4.4-9.8-9.8-9.8S2.4 6.7 2.4 12.2c0 4.6 3.3 8.6 7.7 9.6v-6.8H6.5v-2.8h3.6v-2.1c0-3.6 2.1-5.6 5.4-5.6 1.5 0 2.9.1 3.3.1v3.6h-2.2c-1.8 0-2.1.9-2.1 2v2.3h4.1l-.5 2.8h-3.6v6.8c4.4-1 7.7-5 7.7-9.6z" />
              </svg>
              Facebook Page
            </a>
            <a
              href="https://facebook.com/groups/2298209890521616/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877f2] text-white px-4 py-2 rounded-lg hover:bg-[#1558a6] transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                <path d="M22 12.2c0-5.5-4.4-9.8-9.8-9.8S2.4 6.7 2.4 12.2c0 4.6 3.3 8.6 7.7 9.6v-6.8H6.5v-2.8h3.6v-2.1c0-3.6 2.1-5.6 5.4-5.6 1.5 0 2.9.1 3.3.1v3.6h-2.2c-1.8 0-2.1.9-2.1 2v2.3h4.1l-.5 2.8h-3.6v6.8c4.4-1 7.7-5 7.7-9.6z" />
              </svg>
              Facebook Group
            </a>
          </div>
        </div>
        <div className="dropdown hidden md:block dropdown-end mt-4 md:mt-0">
          <div tabIndex={0} className="btn btn-ghost flex items-center gap-2 text-white">
            Languages
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-32">
            <li><a>English</a></li>
            <li><a>বাংলা</a></li>
            <li><a>Español</a></li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 bg-[#aa1936] text-white p-3 rounded-full shadow-lg md:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isVisible ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
        </svg>
      </button>
    </div>
  );
};

export default Header;
