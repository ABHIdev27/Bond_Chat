import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100/80 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 bg-base-100/90">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary animate-pulse" />
          <span className="font-semibold hidden lg:block tracking-wide text-primary">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3 space-y-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full px-3 py-2 flex items-center gap-3 animate-pulse rounded-xl hover:bg-base-200/60 transition">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full bg-base-200" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 rounded bg-base-200" />
              <div className="skeleton h-3 w-16 rounded bg-base-200" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
