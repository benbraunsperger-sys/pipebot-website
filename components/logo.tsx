import Link from 'next/link';

type LogoProps = {
  href?: string;
  compact?: boolean;
};

export function Logo({ href = '/', compact = false }: LogoProps) {
  return (
    <Link className={`brand${compact ? ' brand-compact' : ''}`} href={href} aria-label="PipeBot Startseite">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M8 7h10.5c4.2 0 6.8 2.5 6.8 6.1s-2.6 6.1-6.8 6.1h-5.3V25H8V7Zm5.2 4.5v3.4h5c1.2 0 2-.7 2-1.7s-.8-1.7-2-1.7h-5Z" />
          <circle cx="24.5" cy="24.5" r="2.6" />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>PipeBot</strong>
      </span>
    </Link>
  );
}
