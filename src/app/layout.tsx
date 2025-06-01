import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from './BootstrapClient';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'RYD Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <BootstrapClient /> {/* C’est ici que tu le déclares */}
        {children}
      </body>
    </html>
  );
}
