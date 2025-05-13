import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminCard({
  title,
  description,
  icon: Icon,
  href,
  actions,
}) {
  return (
    <div className="bg-gray-800 overflow-hidden shadow rounded-lg flex flex-col justify-between">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-full bg-red-900">
              <Icon className="h-6 w-6 text-red-300" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <Link
              href={href}
              className="text-lg font-medium text-white hover:underline"
            >
              {title}
            </Link>
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 px-5 py-3">
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex items-center justify-between text-sm text-red-400 hover:text-red-300"
            >
              <span>{action.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
