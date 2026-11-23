import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExploreDevicesPage } from './pages/ExploreDevicesPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { AskQuestionPage } from './pages/AskQuestionPage';
import { QuestionDetailPage } from './pages/QuestionDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { ExpertsPage } from './pages/ExpertsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserDashboard } from './pages/UserDashboard';
import { DiagnosticAssistantPage } from './pages/DiagnosticAssistantPage';
import { WorkbenchPage } from './pages/WorkbenchPage';
import { ServiceDocketPage } from './pages/ServiceDocketPage';
import { ServiceCentresPage } from './pages/ServiceCentresPage';
import { CostEstimatorPage } from './pages/CostEstimatorPage';
import { AdminDashboard } from './pages/AdminDashboard';

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#172033] antialiased selection:bg-[#2563EB]/15 selection:text-[#101B35]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExploreDevicesPage />} />
          <Route path="/explore/:categorySlug" element={<ExploreDevicesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/questions/ask" element={<AskQuestionPage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:id" element={<SolutionDetailPage />} />
          <Route path="/diagnose" element={<DiagnosticAssistantPage />} />
          <Route path="/workbench" element={<WorkbenchPage />} />
          <Route path="/docket" element={<ServiceDocketPage />} />
          <Route path="/service-centres" element={<ServiceCentresPage />} />
          <Route path="/cost-estimator" element={<CostEstimatorPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route
            path="*"
            element={
              <div className="py-24 text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-800">404</h1>
                <p className="text-sm text-slate-500">The requested FixTrail page does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
