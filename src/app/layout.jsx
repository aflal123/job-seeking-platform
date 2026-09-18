import '../index.css';
import '../App.css';

export const metadata = {
  title: 'JobBook — Career & Mentorship Platform',
  description: 'Full-stack career and mentorship platform connecting Job Seekers, Employers, and Trainers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
