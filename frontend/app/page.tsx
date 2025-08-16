import Dashboard from '../src/components/Dashboard';
import Navbar from '../src/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Dashboard />
    </div>
  );
}
