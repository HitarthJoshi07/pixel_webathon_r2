import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaDribbble } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';

const socialIcons = [
  { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
  { icon: <FaGithub />, href: "https://github.com", label: "GitHub" },
  { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <FaDribbble />, href: "https://dribbble.com", label: "Dribbble" },
];

const footerLinks = [
  { name: "Home", href: "#Home" },
  { name: "Modules", href: "#Features" },
  { name: "Success Stories", href: "#Testimonials" },
  { name: "Contact", href: "#Contact" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="relative z-50 bg-black text-white py-24 px-6 md:px-20 border-t border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="grid lg:grid-cols-4 gap-16 text-center lg:text-left"
        variants={containerVariants}
      >
        {/* Brand */}
        <motion.div className="space-y-6" variants={sectionVariants}>
          <h2 className="text-4xl font-bold uppercase tracking-widest text-red-500 drop-shadow-lg">
            FINLEARN
          </h2>
          <p className="text-white/80 leading-relaxed text-sm max-w-sm mx-auto lg:mx-0">
            Empowering students with the knowledge and skills to manage money,
            build wealth, and make informed financial decisions for life.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="space-y-6" variants={sectionVariants}>
          <h3 className="text-xl font-semibold text-red-400">Contact</h3>
          <div className="space-y-4 text-sm text-white/80">
            <div className="flex items-start gap-3">
              <Mail size={16} />
              <a href="mailto:hello@finlearn.com" className="hover:text-white transition">
                hello@finlearn.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} />
              <a href="tel:+1234567890" className="hover:text-white transition">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} />
              <span>New York, NY</span>
            </div>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div className="space-y-6" variants={sectionVariants}>
          <h3 className="text-xl font-semibold text-red-400">Follow Us</h3>
          <div className="flex justify-center lg:justify-start gap-6 text-2xl">
            {socialIcons.map(({ icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.3, rotate: 8 }}
                className="text-white/80 hover:text-red-500 transition duration-300"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div className="space-y-6" variants={sectionVariants}>
          <h3 className="text-xl font-semibold text-red-400">Navigate</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {footerLinks.map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a href={link.href} className="hover:text-white transition-colors duration-300">
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Newsletter */}
      <motion.div
        className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-10"
        variants={sectionVariants}
      >
        <form className="flex flex-col md:flex-row gap-4 w-full md:max-w-2xl">
          <input
            type="email"
            placeholder="Enter your email for finance tips"
            aria-label="Email address"
            className="flex-1 px-5 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 backdrop-blur-lg focus:outline-none focus:ring-2 ring-red-400 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-lg transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="mt-12 text-center text-xs text-white/50"
        variants={sectionVariants}
      >
        &copy; {new Date().getFullYear()} FINLEARN. ALL RIGHTS RESERVED.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
