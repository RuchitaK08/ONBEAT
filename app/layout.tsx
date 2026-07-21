import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ONBEAT',
  description: 'ONBEAT premium landing page for a workout playlist Chrome extension.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
