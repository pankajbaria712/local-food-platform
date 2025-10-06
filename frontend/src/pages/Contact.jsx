import React, { useState, useEffect, useContext, createContext } from "react";

// The local MOCK ThemeContext and MockThemeProvider have been REMOVED.
// We are restoring the correct import, assuming ThemeContext exists externally.
// NOTE: This will likely cause a compilation error in the sandbox without the external file,
// but this is the correct structure for your application to share the theme.
import { ThemeContext } from "../context/ThemeContext";

// Placeholder utility for icons (using inline SVG for GitHub, LinkedIn, Mail)
const GitHubIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.8 8.21 11.38.6.11.82-.26.82-.57 0-.28-.01-1.01-.01-2c-3.33.72-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6c-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.0-.32 3.3 1.24.96-.27 1.98-.4 3-.4.99 0 2.03.13 3 .4 2.28-1.56 3.28-1.24 3.28-1.24.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.59-2.8 5.62-5.47 5.92.43.37.82 1.12.82 2.27 0 1.64-.01 2.97-.01 3.37 0 .31.21.69.83.57C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z"
    />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <path d="M7 19h-4V8h4v11zM5 5.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
  </svg>
);

export default function Contact() {
  // We expect theme, isDark, etc., to be provided by an outer ThemeProvider
  const { theme, isDark } = useContext(ThemeContext);

  // --- Theme Logic copied from Login.jsx/About.jsx ---
  // Background Class (combines background and text colors)
  const bgClass =
    theme === "dark"
      ? "bg-gray-950 text-gray-100"
      : theme === "light"
      ? "bg-gray-100 text-gray-900"
      : isDark // System is dark
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-gray-900";

  // Card Class (handles border and background for the main container)
  const cardClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  // Secondary text class for general content inside the card (uses text color from bgClass)
  const textClass =
    theme === "dark" || (theme === "system" && isDark)
      ? "text-gray-100"
      : "text-gray-900";

  // Data updated with the specific LinkedIn URL
  const profileData = {
    name: "Pankaj Baria",
    title: "Full-Stack Developer | Focusing on MERN Stack",
    bio: "Passionate developer crafting robust and scalable web applications. Currently focused on building efficient solutions for real-world problems. Experienced in modern JavaScript frameworks and dedicated to clean code.",
    githubUrl: "https://github.com/pankajbaria712",
    linkedinUrl: "https://www.linkedin.com/in/pankaj-baria-619253274/",
    email: "pankajbaria712@example.com", // Placeholder email
    photoPath: "/Profile.png", // Requested path from public folder
  };

  const SocialLink = ({ href, children, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-200 transform hover:scale-105"
      aria-label={label}
    >
      {children}
    </a>
  );

  return (
    <div
      // Use bgClass for the overall container style
      className={`flex flex-col items-center justify-center min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 ${bgClass} transition-colors duration-500`}
    >
      <div
        className={`w-full max-w-lg p-8 md:p-12 border rounded-3xl ${cardClass} shadow-xl dark:shadow-green-900/40 transition-all duration-500`}
      >
        <header className="text-center mb-8">
          <img
            src={profileData.photoPath}
            alt={profileData.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-500 object-cover"
            // Use placeholder image if the user's image fails to load
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop
              e.target.src =
                "https://placehold.co/128x128/10B981/ffffff?text=P";
            }}
          />
          <h1 className={`text-4xl font-bold mb-1 ${textClass}`}>
            {profileData.name}
          </h1>
          <p className="text-green-500 font-medium text-lg">
            {profileData.title}
          </p>
        </header>

        <section className="text-center mb-10">
          <h2 className={`text-2xl font-semibold mb-4 ${textClass}`}>
            About Me
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            {profileData.bio}
          </p>
        </section>

        <section className="text-center">
          <h2 className={`text-2xl font-semibold mb-6 ${textClass}`}>
            Connect with Me
          </h2>
          <div className="flex justify-center space-x-6">
            <SocialLink href={profileData.githubUrl} label="GitHub Profile">
              <GitHubIcon className="w-6 h-6" />
            </SocialLink>
            <SocialLink href={profileData.linkedinUrl} label="LinkedIn Profile">
              <LinkedinIcon className="w-6 h-6" />
            </SocialLink>
            <SocialLink href={`mailto:${profileData.email}`} label="Send Email">
              <MailIcon className="w-6 h-6" />
            </SocialLink>
          </div>
        </section>

        {/* Removed theme toggles: The theme is now expected to be controlled externally */}
      </div>
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Feel free to reach out for collaborations or inquiries.
      </p>
    </div>
  );
}
