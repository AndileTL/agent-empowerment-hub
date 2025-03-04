import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, BarChart2, Users, LineChart, Headset, BookOpen, CheckSquare, Settings, Award, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const menuItems = [
    {
      icon: BarChart2,
      label: "Dashboard",
      route: "/"
    }, 
    {
      icon: Users,
      label: "Agent Management",
      route: "/agents"
    }, 
    {
      icon: LineChart,
      label: "CSR Stats",
      route: "/csr-stats"
    }, 
    {
      icon: Headset,
      label: "Contact Center Performance",
      route: "/cc-performance"
    }, 
    {
      icon: BookOpen,
      label: "Training Lounge",
      route: "/training"
    }, 
    {
      icon: CheckSquare,
      label: "QA Scoring",
      route: "/qa-scoring"
    }, 
    {
      icon: Award,
      label: "Recognition",
      route: "/recognition"
    }
  ];

  const configItems = [
    {
      icon: Settings,
      label: "Settings",
      route: "/settings"
    },
    {
      icon: AlertCircle,
      label: "News",
      route: "/news",
      badge: "New"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 sidebar-gradient text-white">
          <SidebarContent className="p-4 rounded-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center text-white font-bold mr-2">K</div>
                <h1 className="text-xl font-semibold text-white">Kelline</h1>
              </div>
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="text-white hover:bg-secondary-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>

            <div className="relative mx-auto mb-6">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="py-2 pl-10 pr-4 w-full rounded-md bg-secondary-700 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <nav className="space-y-1 mb-8">
              {menuItems.map(item => (
                <Link 
                  key={item.label} 
                  to={item.route} 
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-100 hover:bg-secondary-700 transition-colors ${window.location.pathname === item.route ? 'bg-secondary-700' : ''}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Configuration</h3>
              <nav className="space-y-1">
                {configItems.map(item => (
                  <Link 
                    key={item.label} 
                    to={item.route} 
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-100 hover:bg-secondary-700 transition-colors ${window.location.pathname === item.route ? 'bg-secondary-700' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
