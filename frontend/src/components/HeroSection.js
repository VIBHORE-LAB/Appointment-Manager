import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import hero_img_1 from "../assets/hero_img_1.png";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-12 md:py-24 lg:py-32 xl:py-48 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Streamline Your Appointments
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Seamlessly book appointments while businesses efficiently manage schedules, enhancing the experience for both clients and service providers.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/sign-up" className="text-white bg-gray-800 hover:bg-gray-950 rounded-lg text-sm px-6 py-3">
              Get Started
            </Link>
            <Link to="/log-in" className="text-gray-800 bg-white border border-gray-400 hover:bg-gray-100 rounded-lg text-sm px-6 py-3">
              Log-In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 w-full py-12 md:py-24 lg:py-32 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <img
            alt="Appointment Calendar"
            className="w-full max-w-md mx-auto rounded-xl object-cover"
            src={hero_img_1}
          />
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold sm:text-4xl">Powerful and Easy to Use</h2>
            <p className="mt-4 max-w-lg text-gray-500 md:text-xl dark:text-gray-400">
              Our platform offers a range of features to help you manage your appointments efficiently and grow your business.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/sign-up" className="text-white bg-gray-800 hover:bg-gray-950 rounded-lg text-sm px-6 py-3">
                Start Free Trial
              </Link>
              <Link to="/log-in" className="text-gray-800 bg-white border border-gray-400 hover:bg-gray-100 rounded-lg text-sm px-6 py-3">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Key Features</h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            Our appointment management system is designed to make your life easier and your business more efficient.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <FontAwesomeIcon icon={faCalendar} className="text-gray-800 h-12 w-12" />
            <h3 className="text-xl font-bold">Easy Scheduling</h3>
            <p className="text-gray-500 dark:text-gray-400">Intuitive calendar interface for quick and easy appointment scheduling.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <FontAwesomeIcon icon={faClock} className="text-gray-800 h-12 w-12" />
            <h3 className="text-xl font-bold">Automated Reminders</h3>
            <p className="text-gray-500 dark:text-gray-400">Reduce no-shows with automated email and SMS reminders.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <FontAwesomeIcon icon={faUser} className="text-gray-800 h-12 w-12" />
            <h3 className="text-xl font-bold">Client Management</h3>
            <p className="text-gray-500 dark:text-gray-400">Keep track of client information and appointment history in one place.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
