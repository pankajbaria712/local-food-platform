import React from "react";

// Placeholder utility for icons (as we cannot use external libraries like lucide-react)
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

// --- Component Definitions (Internal to the single file) ---

const Header = () => (
  <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-500">
        FoodShare
      </div>
      <nav className="hidden md:flex space-x-6">
        {["Features", "Impact", "How It Works", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-gray-600 hover:text-green-600 font-medium transition duration-150"
          >
            {item}
          </a>
        ))}
      </nav>
      <a
        href="/signup"
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150"
      >
        Get Started
      </a>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="pt-20 pb-28 bg-gray-50/50" id="hero">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Headline and CTA */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-500">
              Share Surplus Food.
            </span>
            <br />
            <span className="text-gray-900">Nourish Your Community.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            FoodShare makes it simple for businesses and homes to donate surplus
            meals to local charities and NGOs, fighting hunger and reducing
            waste effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition transform hover:scale-[1.02] duration-300"
            >
              Donate Now
            </a>
            <a
              href="/browse"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-green-200 text-green-700 bg-white rounded-xl hover:bg-green-50 transition duration-300"
            >
              Browse Listings
            </a>
          </div>
        </div>

        {/* Right Side: Feature Cards (Original content, enhanced style) */}
        <div className="space-y-6 md:space-y-8 p-6 md:p-10 bg-white shadow-2xl rounded-3xl border border-gray-100">
          <div className="p-5 rounded-2xl bg-lime-50 border-l-4 border-lime-500">
            <h4 className="font-bold text-lg text-gray-800 flex items-center mb-1">
              <Icon
                path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                className="w-5 h-5 mr-3 text-lime-500"
              />
              Instant Posting for Donors
            </h4>
            <p className="text-sm text-gray-600">
              Quickly post surplus food with pickup details and quantity. Take a
              photo, set a time, and help reduce waste in minutes.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-lg text-gray-800 flex items-center mb-1">
              <Icon
                path="M13 10V3L4 14h7v7l9-11h-7z"
                className="w-5 h-5 mr-3 text-green-500"
              />
              Direct Claiming for NGOs
            </h4>
            <p className="text-sm text-gray-600">
              Claim essential food donations and coordinate pickups directly
              with donors in your specific service area.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-lg text-gray-800 flex items-center mb-1">
              <Icon
                path="M9 12l2 2 4-4m5.617 7.083a9 9 0 11-12.63-12.63l12.63 12.63z"
                className="w-5 h-5 mr-3 text-blue-500"
              />
              Secure & Auditable
            </h4>
            <p className="text-sm text-gray-600">
              All transactions are logged, ensuring transparency, safety, and
              compliance for all partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-20 bg-white" id="how-it-works">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">
        Simple Steps to Share
      </h2>
      <p className="text-xl text-gray-500 mb-16">
        Our streamlined process connects surplus to need in three quick steps.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Post Your Surplus",
            description:
              "Upload a photo, detail the quantity, and set the pickup window. This takes less than 60 seconds.",
            iconPath: "M12 6v6m0 0v6m0-6h6m-6 0H6", // Plus
            color: "red",
          },
          {
            title: "NGO Claims It",
            description:
              "Verified local charities receive instant alerts and claim the donation based on their immediate needs.",
            iconPath:
              "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 100 4 2 2 0 000-4z", // Bell
            color: "blue",
          },
          {
            title: "Coordinate & Share",
            description:
              "Use our built-in chat to finalize pickup logistics. Food is shared, and the impact is tracked.",
            iconPath:
              "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z", // Chat Bubble
            color: "green",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div
              className="flex items-center justify-center w-14 h-14 mx-auto rounded-full mb-6"
              style={{
                background: `linear-gradient(to right, ${
                  step.color === "green"
                    ? "#10B981"
                    : step.color === "blue"
                    ? "#3B82F6"
                    : "#EF4444"
                } 0%, ${
                  step.color === "green"
                    ? "#84CC16"
                    : step.color === "blue"
                    ? "#60A5FA"
                    : "#F87171"
                } 100%)`,
              }}
            >
              <Icon path={step.iconPath} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {step.title}
            </h3>
            <p className="text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ImpactSection = () => (
  <section className="py-24 bg-green-700" id="impact">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-16 text-white">
        Our Real-World Impact
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            stat: "1,200,000+",
            label: "Meals Shared",
            iconPath: "M14 11a7 7 0 00-14 0h14z", // Utensils
            color: "lime-300",
          },
          {
            stat: "1,500+",
            label: "Tonnes of CO2 Saved",
            iconPath: "M13 10V3L4 14h7v7l9-11h-7z", // Bolt
            color: "yellow-300",
          },
          {
            stat: "500+",
            label: "NGOs Partnered",
            iconPath: "M4 6h16M4 12h16M4 18h7", // List
            color: "blue-300",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white/20"
          >
            <div
              className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-${item.color}`}
            >
              <Icon path={item.iconPath} className="w-8 h-8 text-green-900" />
            </div>
            <p className="text-5xl font-extrabold text-white mb-2">
              {item.stat}
            </p>
            <p className="text-xl font-medium text-green-200">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-20 bg-gray-50" id="features">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-900">
        Built for Reliability & Trust
      </h2>
      <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
        We prioritize food safety, logistical efficiency, and transparent
        communication across our network.
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {[
          {
            title: "Vetted Partners",
            description:
              "Every NGO and donor is verified to ensure compliance and credibility.",
            iconPath: "M13 10V3L4 14h7v7l9-11h-7z", // Star
          },
          {
            title: "Real-Time Tracking",
            description:
              "Follow the journey of your donation from pickup to delivery seamlessly.",
            iconPath:
              "M12 8c-3.14 0-6.25 1.4-8.54 3.7C1.4 14.22 0 16.7 0 19.33V24h24v-4.67c0-2.63-1.4-5.11-3.46-7.63C18.25 9.4 15.14 8 12 8z", // Shield
          },
          {
            title: "Dedicated Support",
            description:
              "A team is available 24/7 to assist with coordination and logistics.",
            iconPath:
              "M3 8l7.89 5.26c.4.26.9.26 1.3 0L21 8m-2 1a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h14z", // Mail
          },
          {
            title: "Food Safety Focus",
            description:
              "Compliance with all local food handling and safety regulations is mandatory.",
            iconPath:
              "M9 12l2 2 4-4m5.617 7.083a9 9 0 11-12.63-12.63l12.63 12.63z", // Checkmark
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white border border-gray-200 transition hover:border-green-500"
          >
            <Icon
              path={feature.iconPath}
              className="w-8 h-8 text-green-600 mb-3 mx-auto"
            />
            <h4 className="font-semibold text-xl mb-2 text-gray-900">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
        Ready to make a difference?
      </h2>
      <p className="text-xl text-gray-300 mb-10">
        Join FoodShare today and turn your surplus into community nourishment.
        It takes just a minute to sign up.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/signup"
          className="inline-flex items-center px-10 py-4 text-lg font-semibold bg-lime-400 text-gray-900 rounded-xl shadow-lg hover:bg-lime-500 transition transform hover:scale-[1.05] duration-300"
        >
          Create Your Account
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-lg font-bold text-green-400">FoodShare</div>
        <nav className="flex space-x-6">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </nav>
      </div>
      <div className="text-center mt-8 pt-6 border-t border-gray-700">
        &copy; {new Date().getFullYear()} FoodShare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Container for the whole page, ensuring smooth scrolling and applying primary font */}
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ImpactSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
