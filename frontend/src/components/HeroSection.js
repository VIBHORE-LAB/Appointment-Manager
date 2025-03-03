import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you want to use


import hero_img_1 from "../assets/hero_img_1.png";

const HeroSection = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Streamline Your Appointments
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Seamlessly book appointments while businesses efficiently manage
                schedules, enhancing the experience for both clients and service
                providers
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/sign-up">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
                >
                  Get Started
                </button>
              </Link>
              <Link to="/log-in">
                <button
                  type="button"
                  className="text-black bg-white border-{1.5} border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-600 dark:border-gray-600"
                >
                  Log-In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <img
              alt="Appointment Calendar"
              className="w-1/2 mx-auto  overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last "
              height="310"
              src={hero_img_1}
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful and Easy to Use
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a range of features to help you manage
                  your appointments efficiently and grow your business.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/sign-up">
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
                  >
                    Start Free Trial
                  </button>
                </Link>
                <Link to="/log-in">
                  <button
                    type="button"
                    className="text-black bg-white border-{1.5} border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-600 dark:border-gray-600"
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Our appointment management system is designed to make your life easier and your business more
          efficient.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
      <div className="flex flex-col justify-center space-y-4">
        <FontAwesomeIcon icon={faCalendar} className="h-12 w-12" /> {/* Update this line */}
        <h3 className="text-xl font-bold">Easy Scheduling</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Intuitive calendar interface for quick and easy appointment scheduling.
        </p>
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <FontAwesomeIcon icon={faClock} className="h-12 w-12" /> {/* Update this line */}
        <h3 className="text-xl font-bold">Automated Reminders</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Reduce no-shows with automated email and SMS reminders.
        </p>
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <FontAwesomeIcon icon={faUser} className="h-12 w-12" /> {/* Update this line */}
        <h3 className="text-xl font-bold">Client Management</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Keep track of client information and appointment history in one place.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default HeroSection;
