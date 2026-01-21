import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ConsultPage } from './pages/ConsultPage';
import { StartHerePage } from './pages/StartHerePage';
import { PrivateTrainingPage } from './pages/PrivateTrainingPage';
import { StayTrainPage } from './pages/StayTrainPage';
import { PackLifePage } from './pages/PackLifePage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQsPage } from './pages/FAQsPage';
import { BlogPage } from './pages/BlogPage';
import { DashboardPage } from './pages/crm/DashboardPage';
import { LeadsPage } from './pages/crm/LeadsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/start-here" element={<StartHerePage />} />
            <Route path="/private-training" element={<PrivateTrainingPage />} />
            <Route path="/stay-train" element={<StayTrainPage />} />
            <Route path="/pack-life" element={<PackLifePage />} />
            <Route path="/puppy-power" element={<HomePage />} />
            <Route path="/foundations" element={<HomePage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<HomePage />} />
            <Route path="/gift-cards" element={<HomePage />} />
          </Route>
          
          {/* CRM/Admin Routes */}
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/leads" element={<LeadsPage />} />
          <Route path="/admin/leads/:id" element={<LeadsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
