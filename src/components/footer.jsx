import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";


export default function Footer(){
    return(
        <footer className=" bg-gradient-to-r from-purple-50  to-purple-50 border-t border-gray-200 text-center py-6 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left side */}
        <p className="text-gray-700">
          © {new Date().getFullYear()} <span className="font-semibold text-purple-700">Tanmay Raj</span>. All rights reserved.
        </p>

        {/* Middle social icons */}
        <div className="flex space-x-4">
          <a href="https://instagram.com/tanmay.raj53" 
          target="_blank"
           rel="noopener noreferrer"
          className="hover:text-purple-600 transition"> 
          <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://github.com/Tanmayraj503" 
          target="_blank"
           rel="noopener noreferrer"
          className="hover:text-purple-600 transition">
            <FontAwesomeIcon icon={faGithub} />
            </a>
        </div>
      </div>
    </footer>
    )
}