'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { scrollManager } from '@/lib/scroll/scroll';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    scrollManager.createSectionTimeline(sectionRef.current, tl, {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { email, message });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white z-10 pointer-events-auto py-20"
      id="contact"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-8 opacity-0"
        >
          Landing
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Ready to create something extraordinary together? 
          Let&apos;s turn your vision into reality.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6 opacity-0"
        >
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>
          
          <div>
            <textarea
              placeholder="Tell me about your project"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>

        {/* Social links */}
        <div className="flex justify-center space-x-8 mt-12">
          <a
            href="https://github.com/owen-richards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/owen-richards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/owen_richards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
