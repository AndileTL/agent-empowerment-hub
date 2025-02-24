
import DashboardLayout from "@/components/DashboardLayout";
import { useCSRStats } from "@/hooks/useCSRStats";
import CallCenterMetrics from "@/components/dashboard/CallCenterMetrics";

const Home = () => {
  const { data: csrStats } = useCSRStats();
  
  const calculateTotalCalls = (stats: any[]) => 
    stats.reduce((sum, stat) => sum + (stat.calls || 0), 0);
  
  const calculateTotalChats = (stats: any[]) => 
    stats.reduce((sum, stat) => sum + (stat.live_chat || 0), 0);
  
  const calculateAverageIssues = (stats: any[]) => {
    const total = stats.reduce((sum, stat) => {
      const issues = (
        (stat.helpdesk_tickets || 0) +
        (stat.calls || 0) +
        (stat.live_chat || 0) +
        (stat.support_dns_emails || 0) +
        (stat.social_tickets || 0) +
        (stat.billing_tickets || 0) +
        (stat.walk_ins || 0)
      );
      return sum + issues;
    }, 0);
    return stats.length ? total / stats.length : 0;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto mt-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-semibold">Total Calls</h2>
              <p className="text-3xl">{csrStats ? calculateTotalCalls(csrStats) : 'Loading...'}</p>
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-semibold">Total Chats</h2>
              <p className="text-3xl">{csrStats ? calculateTotalChats(csrStats) : 'Loading...'}</p>
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-semibold">Avg Issues Handled</h2>
              <p className="text-3xl">{csrStats ? calculateAverageIssues(csrStats).toFixed(2) : 'Loading...'}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Call Center Dashboard</h1>
          <CallCenterMetrics agentStats={csrStats} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
