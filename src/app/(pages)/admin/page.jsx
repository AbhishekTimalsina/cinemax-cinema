import { Film, Ticket, Calendar } from "lucide-react";
import AdminCard from "@/components/admin/admin-card";

export default async function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Admin Control Panel
        </h1>
      </div>

      <div className="grid sm:grid-cols-1 gap-6 lg:grid-cols-2 grid-cols-3">
        <AdminCard
          title="Movies Management"
          description="Add, edit, or remove movies from the catalog"
          icon={Film}
          href="/admin/movies"
          actions={[
            { label: "View All Movies", href: "/admin/movies" },
            { label: "Add New Movie", href: "/admin/movies/create" },
          ]}
        />

        <AdminCard
          title="Bookings Management"
          description="View and manage customer bookings"
          icon={Ticket}
          href="/admin/bookings"
          actions={[
            { label: "View All Bookings", href: "/admin/bookings" },
            { label: "Today's Bookings", href: "/admin/bookings?date=today" },
          ]}
        />

        <AdminCard
          title="Showtimes Management"
          description="Schedule and manage movie showtimes"
          icon={Calendar}
          href="/admin/showtimes"
          actions={[
            { label: "View All Showtimes", href: "/admin/showtimes" },
            { label: "Add New Showtime", href: "/admin/showtimes/create" },
          ]}
        />
      </div>
    </div>
  );
}
