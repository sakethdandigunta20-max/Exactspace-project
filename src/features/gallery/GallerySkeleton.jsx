import React from 'react';

export default function GallerySkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-white rounded-2xl border border-slate-200/60 shadow-xs"
        >
          {/* Photo Shimmer */}
          <div className="w-full sm:w-64 md:w-72 aspect-[16/10] rounded-xl skeleton-shimmer shrink-0" />

          {/* Details Shimmer */}
          <div className="flex-1 flex items-center gap-4 py-2 w-full">
            <div className="h-6 w-48 rounded-lg skeleton-shimmer" />
            <div className="h-8 w-20 rounded-full skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
