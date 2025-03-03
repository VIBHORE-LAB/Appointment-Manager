import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react"

const Footer = () => {
    return(
        <>
       <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">AppointmentManager</span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 md:space-x-12">
            <Link href="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-6 text-center md:mb-0 md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} AppointmentManager. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
        </>
       
    );
}


export default Footer;