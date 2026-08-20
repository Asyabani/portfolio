import { socialLinks } from '@/lib/data/social';
import Link from 'next/link';
import { projects } from '@/lib/data/projects';
import { services } from '@/lib/data/services';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-8 bg-[#f5f6ff] text-dark dark:bg-[#081226] dark:text-white transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start pt-8 border-t border-slate-300 dark:border-gray-700 gap-8">
          {/* Left Side - Our Projects */}
          <div className="w-full md:w-1/2">
            <p className="text-sm text-slate-600 dark:text-gray-400">
              OUR PROJECTS
            </p>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              {projects.map((project, index) => (
                <span key={project.id}>
                  <Link
                    href={project.url}
                    className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    {project.title}
                  </Link>
                  {index < projects.length - 1 && ', '}
                </span>
              ))}
            </p>
            {/* services */}
            <p className="text-sm text-slate-600 dark:text-gray-400 mt-5">
              SERVICES
            </p>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              {services.map((service, index) => (
                <span key={index}>
                  {service}
                  {index < services.length - 1 && ', '}
                </span>
              ))}
            </p>
            {/* Copyright */}
            <p className="font-medium text-xs text-slate-600 dark:text-gray-400 text-start md:text-start my-0 py-3">
              <a
                href="https://egdev.id"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-xs text-slate-600 dark:text-gray-400 text-start md:text-start my-0 py-0"
              >
                EXEMPLI GRATIA INDONESIA
              </a>{' '}
              © {currentYear} ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Right Side - Social Media and Copyright */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex justify-center items-center border border-slate-400 text-slate-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out dark:border-gray-600 dark:text-gray-400 dark:hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  role="img"
                  width="18"
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <title>LinkedIn</title>
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex justify-center items-center border border-slate-400 text-slate-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out dark:border-gray-600 dark:text-gray-400 dark:hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-white"
                aria-label="GitHub"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex justify-center items-center border border-slate-400 text-slate-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out dark:border-gray-600 dark:text-gray-400 dark:hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Instagram</title>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex justify-center items-center border border-slate-400 text-slate-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out dark:border-gray-600 dark:text-gray-400 dark:hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex justify-center items-center border border-slate-400 text-slate-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out dark:border-gray-600 dark:text-gray-400 dark:hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-white"
                aria-label="TikTok"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>TikTok</title>
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
            <p className="font-medium text-xs text-slate-600 dark:text-gray-400 text-start md:text-start my-0 py-3">
              MADE BY NURZAMAN ASYABANI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
