import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Placeholder utility for icons
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function About() {
  const { theme, isDark } = useContext(ThemeContext);

  // Theme-based colors logic copied from Login.jsx
  const bgClass =
    theme === "dark"
      ? "bg-gray-950"
      : theme === "light"
      ? "bg-gray-100"
      : isDark
      ? "bg-gray-900"
      : "bg-gray-100";

  const textClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "text-gray-100"
      : "text-gray-900";

  const cardClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  const shadowClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "shadow-2xl shadow-green-900/50"
      : "shadow-xl";

  return (
    <div
      className={`min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 ${bgClass} ${textClass} transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-lime-400">
              Our Mission
            </span>
            <span className={`block mt-2 ${textClass}`}>
              Zero Waste, Zero Hunger.
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            FoodShare bridges the gap between food surplus and community need,
            making every donation simple, secure, and impactful.
          </p>
        </header>

        {/* Core Values Section */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${textClass}`}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Impact First",
                description:
                  "Our platform is built to maximize the positive effect on both the environment and vulnerable communities.",
                iconPath:
                  "M21 15.546c-.524 0-1.047-.11-1.53-.326l-3.328-1.424A9.914 9.914 0 0112 15c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8c0 1.258-.29 2.47-.834 3.578l1.424 3.328c.216.483.326 1.006.326 1.53z", // Heart/Circle
              },
              {
                title: "Simplicity & Trust",
                description:
                  "We ensure the donation process is easy for donors and trustworthy for our NGO partners through clear logging.",
                iconPath:
                  "M9 12l2 2 4-4m5.617 7.083a9 9 0 11-12.63-12.63l12.63 12.63z", // Checkmark
              },
              {
                title: "Sustainability",
                description:
                  "By preventing food waste, we actively contribute to lower carbon emissions and a healthier planet.",
                iconPath:
                  "M3 5a2 2 0 012-2h3.25a.75.75 0 01.75.75v3.25a2 2 0 002 2h3.25a.75.75 0 01.75.75v3.25a2 2 0 002 2h3.25a.75.75 0 01.75.75V21a2 2 0 01-2 2h-3.25a.75.75 0 01-.75-.75v-3.25a2 2 0 00-2-2h-3.25a.75.75 0 01-.75-.75v-3.25a2 2 0 00-2-2H5a2 2 0 01-2-2v-3.25a.75.75 0 01.75-.75h3.25a2 2 0 002-2V5.75a.75.75 0 01.75-.75h3.25a2 2 0 002-2V3a.75.75 0 01.75-.75h3.25a2 2 0 012 2v3.25a.75.75 0 01-.75.75h-3.25a2 2 0 00-2 2v3.25a.75.75 0 01-.75.75h-3.25a2 2 0 00-2 2v3.25a.75.75 0 01-.75.75H5z", // Leaf/Growth
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border transition duration-300 ${cardClass} hover:border-green-500`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <Icon
                    path={value.iconPath}
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                  />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${textClass}`}>
                  {value.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team/Story Section (Using a Card structure) */}
        <section
          className={`p-10 rounded-2xl border ${cardClass} ${shadowClass} transition-all duration-500`}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-lime-400`}
              >
                The FoodShare Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                FoodShare was founded in 2023 by a group of passionate chefs and
                software engineers who saw the staggering amount of food wasted
                daily while local shelters struggled to feed people.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our goal was to create a technological solution that was faster
                and more reliable than traditional logistics, allowing fresh,
                edible surplus food to reach those in need *within hours*.
                Today, we serve hundreds of partners and have facilitated
                thousands of meal donations.
              </p>
            </div>
            {/* Placeholder for an image or graphic */}
            <div className="h-64 bg-green-50 dark:bg-green-900/50 rounded-xl flex items-center justify-center border border-dashed border-green-300 dark:border-green-700">
              <span className="text-green-600 dark:text-green-400 font-medium">
                Team Photo/Infographic Placeholder
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
