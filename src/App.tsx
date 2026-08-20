import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ScrollToTop } from './components/ScrollToTop'
import { LearnerProvider } from './context/LearnerContext'
import { AboutPage } from './pages/AboutPage'
import { CheckInPage } from './pages/CheckInPage'
import { DashboardPage } from './pages/DashboardPage'
import { ImpactPage } from './pages/ImpactPage'
import { LandingPage } from './pages/LandingPage'
import { LessonPage } from './pages/LessonPage'
import { LibraryPage } from './pages/LibraryPage'
import { PathPage } from './pages/PathPage'
import { PracticePage } from './pages/PracticePage'
import { ResourcePage } from './pages/ResourcePage'
import { ScenarioPage } from './pages/ScenarioPage'
import { StudioPage } from './pages/StudioPage'

export default function App() {
  return (
    <LearnerProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route element={<AppShell />}>
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/path" element={<PathPage />} />
          <Route path="/lesson/:moduleId" element={<LessonPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/:scenarioId" element={<ScenarioPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/resource/:resourceId" element={<ResourcePage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LearnerProvider>
  )
}
