'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <Link href="/" className="brand-name">
          Hafizh Alexander
        </Link>

        <div className="nav-right">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`nav-link${pathname === item.href ? ' active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-extras">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
