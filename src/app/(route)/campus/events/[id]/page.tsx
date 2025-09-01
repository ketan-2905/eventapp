import EventDetailComponent from "@/components/EventDetailPage";
import { log } from "util";

interface EventPageParams {
  id: string
}

interface EventPageProps {
  params: EventPageParams
}

export default function Event({ params }: EventPageProps) {
  const { id } = params
  console.log("Event ID:", id);
    
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <EventDetailComponent />
    </div>
  );
}
