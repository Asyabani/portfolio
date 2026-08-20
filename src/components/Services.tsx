'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description:
      'Building modern, responsive, and user-friendly web applications using the latest technologies.',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description:
      'Creating beautiful and intuitive interfaces that provide exceptional user experiences.',
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    description:
      'Optimizing websites and applications for maximum speed and efficiency.',
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    description:
      'Developing cross-platform mobile applications and progressive web apps.',
  },
  {
    icon: '🔧',
    title: 'Maintenance & Support',
    description:
      'Providing ongoing maintenance, updates, and technical support for your projects.',
  },
  {
    icon: '🚀',
    title: 'Consulting',
    description:
      'Offering expert advice on technology choices, architecture, and digital strategy.',
  },
];

export function Services() {
  useEffect(() => {
    const section = document.querySelector('#services');
    if (!section) return;

    // Animate service cards on scroll
    gsap.fromTo(
      '.service-card',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-2xl md:text-4xl text-dark dark:text-white mb-4 uppercase">
            Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to bring your digital ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-slate-50 dark:bg-slate-800 p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl md:text-5xl mb-4">{service.icon}</div>
              <h3 className="font-bold text-xl text-dark dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
