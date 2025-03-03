
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Server, Network, PlugZap, Ticket, Clock, Target } from "lucide-react";
import { format } from "date-fns";

interface Outage {
  id: number;
  reason: string;
  severity: string;
  ticketRef: string;
  startTime: string;
  estimatedResolution: string;
  affectedServices: string[];
  updates: string;
}

interface OutageDetailsProps {
  outage: Outage;
}

const OutageDetails = ({ outage }: OutageDetailsProps) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high': return <Server className="h-5 w-5 text-orange-500" />;
      case 'medium': return <Network className="h-5 w-5 text-yellow-500" />;
      case 'low': return <PlugZap className="h-5 w-5 text-blue-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPp"); // Format with date-fns: Oct 15, 2023, 8:30 AM
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {getSeverityIcon(outage.severity)}
          {outage.reason}
        </DialogTitle>
        <DialogDescription className="flex items-center gap-1">
          <Ticket className="h-4 w-4" />
          <span>{outage.ticketRef}</span>
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Started</h4>
            <p className="text-sm">{formatDate(outage.startTime)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Est. Resolution</h4>
            <p className="text-sm">{formatDate(outage.estimatedResolution)}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Severity</h4>
          <div className="flex items-center gap-2">
            {getSeverityIcon(outage.severity)}
            <span className="capitalize">{outage.severity}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Affected Services</h4>
          <div className="flex flex-wrap gap-2">
            {outage.affectedServices.map((service, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Updates</h4>
          <p className="text-sm whitespace-pre-line">{outage.updates}</p>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline">Close</Button>
        <Button type="button">View Ticket Details</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default OutageDetails;
