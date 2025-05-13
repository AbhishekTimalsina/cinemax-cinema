"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Ticket,
  Calendar,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navigation = [
    { name: "Control Panel", href: "/admin", icon: LayoutDashboard },
    {
      name: "Movies",
      href: "/admin/movies",
      icon: Film,
      subItems: [
        { name: "All Movies", href: "/admin/movies" },
        { name: "Add New Movie", href: "/admin/movies/create" },
      ],
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: Ticket,
      subItems: [
        { name: "All Bookings", href: "/admin/bookings" },
        { name: "Today's Bookings", href: "/admin/bookings?date=today" },
        { name: "Pending Bookings", href: "/admin/bookings?status=pending" },
      ],
    },
    {
      name: "Showtimes",
      href: "/admin/showtimes",
      icon: Calendar,
      subItems: [
        { name: "All Showtimes", href: "/admin/showtimes" },
        { name: "Add New Showtime", href: "/admin/showtimes/create" },
        { name: "Schedule", href: "/admin/showtimes/schedule" },
      ],
    },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  function handleLogout() {
    fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/logout`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push("/login");
        }
      });
  }

  return (
    <>
      {/* Mobile menu button */}
      <div
        className="hidden lg:block lg:fixed top-4 right-[50%] translate-x-[50%] z-50"
        id="mobile-menu"
      >
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:fixed lg:block inset-0 z-40 transform hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex flex-col w-72 h-full bg-gray-800 text-white">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <Link href="/admin" className="flex items-center">
              <span className="ml-2 font-semibold">Admin</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md hover:bg-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => !item.subItems && setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>

                  {item.subItems && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`flex items-center px-4 py-2 text-xs font-medium rounded-md ${
                            isActive(subItem.href)
                              ? "bg-gray-900 text-white"
                              : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Exit Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="lg:hidden flex flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
              <Link href="/admin" className="flex items-center">
                <span className="ml-2 text-white font-semibold">Admin</span>
              </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>

                    {item.subItems && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center px-4 py-2 text-xs font-medium rounded-md ${
                              isActive(subItem.href)
                                ? "bg-gray-900 text-white"
                                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Exit Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
