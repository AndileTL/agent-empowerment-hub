import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, BarChart2, Users, BookOpen, CheckSquare, Settings, Award, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const menuItems = [{
    icon: BarChart2,
    label: "Dashboard",
    route: "/"
  }, {
    icon: Users,
    label: "Agent Management",
    route: "/agents"
  }, {
    icon: LineChart,
    label: "CSR Stats",
    route: "/csr-stats"
  }, {
    icon: BookOpen,
    label: "Training Lounge",
    route: "/training"
  }, {
    icon: CheckSquare,
    label: "QA Scoring",
    route: "/qa"
  }, {
    icon: Award,
    label: "Recognition",
    route: "/recognition"
  }, {
    icon: Settings,
    label: "Settings",
    route: "/settings"
  }];
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent className="p-4 rounded-sm">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-semibold text-primary-800">Contact Center</h1>
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
            <nav className="space-y-2">
              {menuItems.map(item => <a key={item.label} href={item.route} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-100 transition-colors">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>)}
            </nav>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default DashboardLayout;