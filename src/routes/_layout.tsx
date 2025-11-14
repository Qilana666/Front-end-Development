import { Outlet } from 'react-router-dom'
import { AppProviders } from '@/components/AppProviders'

function LayoutComponent() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
        <Outlet />
      </div>
    </AppProviders>
  )
}

export default LayoutComponent