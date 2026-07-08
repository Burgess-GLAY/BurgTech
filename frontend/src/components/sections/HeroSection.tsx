'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const MEDIA = [
  { type: 'video', src: '/images/brandvideo.mp4' },
  { type: 'image', src: '/images/brandflyer.jpeg', alt: 'BurgTech Solutions Flyer' },
];

const MEDIA_DURATION = 8000; // 8 seconds each

export function HeroSection() {
  const [mediaIndex, setMediaIndex]   = useState(0);
  const [fading, setFading]           = useState(false);
  const videoRef                      = useRef<HTMLVideoElement>(null);

  // Auto-rotate media every MEDIA_DURATION ms with crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setMediaIndex(i => (i + 1) % MEDIA.length);
        setFading(false);
      }, 600); // fade out duration
    }, MEDIA_DURATION);
    return () => clearInterval(timer);
  }, []);

  // Auto-play video when it becomes active
  useEffect(() => {
    if (MEDIA[mediaIndex].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [mediaIndex]);

  const current = MEDIA[mediaIndex];

  return (
    <section className="bt-hero">
      {/* Subtle grid / dot background texture */}
      <div className="bt-hero__bg-grid" aria-hidden="true" />

      <div className="bt-hero__inner">

        {/* ── LEFT COLUMN ── */}
        <div className="bt-hero__left">

          {/* Badge pill — like Builder.io's top label */}
          <div className="bt-hero__badge">
            <span className="bt-hero__badge-dot" aria-hidden="true" />
            AI-Driven Technology Company
          </div>

          {/* Main headline */}
          <h1 className="bt-hero__heading">
            Build <span className="bt-hero__heading-accent">smarter.</span><br />
            Scale <span className="bt-hero__heading-accent">faster.</span><br />
            <span className="bt-hero__heading-accent bt-hero__heading-gradient">
              Grow further.
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="bt-hero__sub">
            BurgTech Solutions delivers advanced digital solutions — from web
            platforms and mobile apps to AI analytics and cloud infrastructure.
          </p>

          {/* Feature list — like Builder.io's left-side bullets */}
          <ul className="bt-hero__features">
            <li>
              <span className="bt-hero__feature-icon">&lt;/&gt;</span>
              <div>
                <strong>Build together</strong>
                <p>Push your project to us and get production-ready results fast.</p>
              </div>
            </li>
            <li>
              <span className="bt-hero__feature-icon">⚡</span>
              <div>
                <strong>Connects to your workflow</strong>
                <p>We integrate with your existing stack, design system, and tools.</p>
              </div>
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className="bt-hero__ctas">
            <Link href="/contact" className="bt-hero__cta-primary">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="bt-hero__cta-secondary">
              View our work
            </Link>
          </div>

        </div>

        {/* ── RIGHT COLUMN — rotating media ── */}
        <div className="bt-hero__right">
          <div className="bt-hero__media-frame">

            {/* Glow ring behind the panel */}
            <div className="bt-hero__media-glow" aria-hidden="true" />

            {/* Media panel */}
            <div
              className={[
                'bt-hero__media-panel',
                fading ? 'bt-hero__media-panel--fading' : '',
              ].join(' ')}
            >
              {current.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={current.src}
                  className="bt-hero__media-asset"
                  autoPlay
                  muted
                  playsInline
                  loop={false}
                  poster="/images/brandflyer.jpeg"
                />
              ) : (
                <img
                  src={current.src}
                  alt={current.alt}
                  className="bt-hero__media-asset"
                />
              )}

              {/* Overlay gradient at bottom for bleed effect */}
              <div className="bt-hero__media-overlay" aria-hidden="true" />
            </div>

            {/* Media type indicator dots */}
            <div className="bt-hero__media-dots" aria-label="Media indicator">
              {MEDIA.map((_, i) => (
                <button
                  key={i}
                  className={[
                    'bt-hero__media-dot',
                    i === mediaIndex ? 'bt-hero__media-dot--active' : '',
                  ].join(' ')}
                  onClick={() => {
                    setFading(true);
                    setTimeout(() => {
                      setMediaIndex(i);
                      setFading(false);
                    }, 400);
                  }}
                  aria-label={`Switch to ${MEDIA[i].type}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Bottom fade into next section */}
      <div className="bt-hero__bottom-fade" aria-hidden="true" />
    </section>
  );
}
