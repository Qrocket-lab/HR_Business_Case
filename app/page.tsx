import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RootCause from '@/components/RootCause';
import PriorityMatrix from '@/components/PriorityMatrix';
import SolutionPillars from '@/components/SolutionPillars';
import BudgetSection from '@/components/BudgetSection';
import Dashboard from '@/components/Dashboard';
import ImplementationRoadmap from '@/components/ImplementationRoadmap';
import SuccessMetrics from '@/components/SuccessMetrics';
import Conclusion from '@/components/Conclusion';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RootCause />
        <PriorityMatrix />
        <SolutionPillars />
        <BudgetSection />
        <Dashboard />
        <ImplementationRoadmap />
        <SuccessMetrics />
        <Conclusion />
      </main>
    </>
  );
}
