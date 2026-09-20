import Link from 'next/link';

type LogoProps = {
  href?: string;
  compact?: boolean;
};

export function Logo({ href = '/', compact = false }: LogoProps) {
  return (
    <Link className={`brand${compact ? ' brand-compact' : ''}`} href={href} aria-label="PipeBot Startseite">
      <span className="brand-mark" aria-hidden="true">
        <img src="/favicon.svg" alt="" />
      </span>
      <span className="brand-copy">
        <strong>PipeBot</strong>
        <small>by Pipeline AI Solutions</small>
      </span>
    </Link>
  );
}
