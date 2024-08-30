import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LampContainer } from './Components/ui/lamp';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Example: Trigger effect based on scroll position
      const lampElement = document.querySelector('.lamp-effect');

      if (lampElement) {
        // Adjust lamp effect based on scroll position
        lampElement.style.opacity = Math.min(1, scrollPosition / 300); // Example effect
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the scroll event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LampContainer className="lamp-effect flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mt-12 flex flex-col items-center justify-center">
        <h1 className="mb-5 text-4xl font-bold">
          {["Welcome", "to", "Our", "Website"].map((item, index) => (
            <span key={index} className="font-bold tracking-tight leading-none mr-1">
              {item}
            </span>
          ))}
        
        </h1>
        <div className="flex gap-4">
          <Link to="/generate-password" className="bg-green-500 text-white py-3 px-8 rounded-md m-2 no-underline hover:underline">
            Generate Password
          </Link>
          <Link to="/retrieve-password" className="bg-green-500 text-white py-3 px-8 rounded-md m-2 no-underline hover:underline">
            Retrieve Password
          </Link>
        </div>
      </div>
    </LampContainer>
  );
};

export default Home;
