'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialLinks } from '@/lib/data/social';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  useEffect(() => {
    const section = document.querySelector('#contact');
    if (!section) return;

    // Animate contact section on scroll
    gsap.fromTo(
      '#contact h2',
      {
        opacity: 0,
        y: -30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.contact-item',
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="contact" className="py-20 bg-slate-100 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-2xl md:text-4xl text-dark dark:text-white mb-4 uppercase">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Let's work together to bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="contact-item">
                <h3 className="font-bold text-xl text-dark dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19a2 2 0 01-2-2V7a2 2 0 012-2h2l2 2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-7-7l2 2m0-2l-2-2m2 2l2-2"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-dark dark:text-white">
                        Email
                      </p>
                      <p className="text-sm">{socialLinks.email}</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-dark dark:text-white">
                        LinkedIn
                      </p>
                      <p className="text-sm">Connect professionally</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-dark dark:text-white">
                        GitHub
                      </p>
                      <p className="text-sm">Check out my work</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <h3 className="font-bold text-xl text-dark dark:text-white mb-4">
                  Based In
                </h3>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-4-2V5a3 3 0 013-3v3a3 3 0 01-6 0v-1a3 3 0 013-3"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">
                      Indonesia
                    </p>
                    <p className="text-sm">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Message */}
            <div className="contact-item">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                <h3 className="font-bold text-xl text-dark dark:text-white mb-4">
                  Send a Message
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Have a project in mind? Let's discuss how we can work
                  together.
                </p>
                <a
                  href={`mailto:${socialLinks.email}?subject=Project Inquiry`}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-teal-500 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19a2 2 0 01-2-2V7a2 2 0 012-2h2l2 2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-7-7l2 2m0-2l-2-2m2 2l2-2"
                    />
                  </svg>
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
