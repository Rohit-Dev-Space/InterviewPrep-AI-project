import React from "react";

/* Base skeleton block */
const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

export default function LearnMoreDrawerSkeleton({ isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="fixed w-full inset-0 z-50 flex">

            {/* Drawer */}
            <div className="relative ml-auto h-full w-full bg-white shadow-2xl p-6 flex flex-col gap-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>

                {/* Divider */}
                <Skeleton className="h-px w-full" />

                {/* Content */}
                <div className="space-y-4 overflow-y-auto">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />

                    <Skeleton className="h-4 w-full mt-6" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-9/12" />

                    {/* Code block skeleton */}
                    <div className="mt-6 bg-gray-100 rounded-lg p-4 space-y-2">
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-4/6" />
                    </div>

                    {/* List skeleton */}
                    <div className="mt-6 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto">
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
