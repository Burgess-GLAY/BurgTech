'use client';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

const ROW_1 = [
  'Web Development', 'React & Next.js', 'Mobile Apps', 'Flutter',
  'E-Commerce', 'Shopify', 'Data Analytics', 'Python', 'Cloud Migration',
  'AWS', 'AI Solutions', 'Machine Learning', 'UI/UX Design', 'Figma',
  'DevOps', 'Docker', 'Kubernetes', 'FastAPI', 'PostgreSQL', 'Node.js',
];

const ROW_2 = [
  'Progressive Web Apps', 'TypeScript', 'GraphQL', 'REST APIs',
  'Firebase', 'MongoDB', 'Tailwind CSS', 'Cybersecurity', 'SEO',
  'Digital Marketing', 'Flyer Design', 'Brand Identity', 'CRM Systems',
  'Custom Dashboards', 'Real-Time Apps', 'WebSockets', 'CI/CD',
  'Serverless', 'Payment Integration', 'Stripe',
];

// Animated counter hook
function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 1800, active);
  return (
    <div className="bt-stats__item">
      <span className="bt-stats__number">
        {count}{suffix}
      </span>
      <span className="bt-stats__label">{label}</span>
    </div>
  );
}

export function StatsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  const { data: services } = useQuery({
    queryKey: ['services-preview'],
    queryFn: () => apiClient.get('/services').then(r => r.data.services),
  });

  const STATS = [
    { value: 30,  suffix: '+', label: 'Projects delivered'  },
    { value: services?.length || 16,  suffix: '',  label: 'Services offered'    },
    { value: 4,   suffix: '',  label: 'Expert team members' },
    { value: 100, suffix: '%', label: 'Client satisfaction' },
  ];

  // Trigger counter animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersActive(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Duplicate arrays for seamless infinite scroll
  const track1 = [...ROW_1, ...ROW_1];
  const track2 = [...ROW_2, ...ROW_2];

  return (
    <section className="bt-marquee-section" ref={sectionRef}>

      {/* Top fade */}
      <div className="bt-marquee-section__fade bt-marquee-section__fade--top" aria-hidden="true" />

      {/* ── ROW 1 — scrolls LEFT ── */}
      <div className="bt-marquee-row" aria-hidden="true">
        <div className="bt-marquee-track bt-marquee-track--left">
          {track1.map((item, i) => (
            <span key={i} className="bt-marquee-pill">{item}</span>
          ))}
        </div>
      </div>

      {/* ── ROW 2 — scrolls RIGHT ── */}
      <div className="bt-marquee-row" aria-hidden="true">
        <div className="bt-marquee-track bt-marquee-track--right">
          {track2.map((item, i) => (
            <span key={i} className="bt-marquee-pill">{item}</span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="bt-marquee-divider" aria-hidden="true" />

      {/* ── STATS ── */}
      <div className="bt-stats">
        {STATS.map((s, i) => (
          <StatItem key={i} {...s} active={countersActive} />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="bt-marquee-section__fade bt-marquee-section__fade--bottom" aria-hidden="true" />

    </section>
  );
}
