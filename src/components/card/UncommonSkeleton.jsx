import React from "react";

const UncommonSkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-secondary p-6 h-44 shadow-lg">
      {/* Glow border */}
      <div className="absolute inset-0 rounded-2xl border border-white/5" />

      {/* Animated shimmer */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-shimmer" />

      {/* Fake icon */}
      <div className="w-12 h-12 rounded-full bg-neutral-200 mb-4" />

      {/* Fake title */}
      <div className="h-4 w-3/4 bg-neutral-200 rounded mb-3" />

      {/* Fake description lines */}
      <div className="h-3 w-full bg-neutral-200 rounded mb-2" />
      <div className="h-3 w-5/6 bg-neutral-200 rounded" />
    </div>
  );
};

export default UncommonSkeletonCard;