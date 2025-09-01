import AdminProfilePage from "@/components/AdminProfilePage";
import EventDetailDisplay from "@/components/EventDetailDisplay";
import EventDetailPage from "@/components/EventDetailPage";
import EventsListing from "@/components/EventsListing";
import LoginPage from "@/components/LoginPage";
import StudentProfilePage from "@/components/StudentProfilePage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <EventDetailPage />
      <EventsListing />
      <LoginPage />
      <StudentProfilePage />
      <AdminProfilePage />
      <EventDetailDisplay />
    </div>
  );
}
