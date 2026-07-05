"use client";

import { useState } from "react";
import { Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisaImagePreviewProps {
  className?: string;
}

export function VisaImagePreview({ className }: VisaImagePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "relative group cursor-pointer overflow-hidden rounded-xl",
          "border-2 border-slate-200 bg-slate-50",
          className
        )}
        onClick={() => setIsFullscreen(true)}
      >
        {/* Receipt Image Placeholder */}
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-primary-txt">Receipt Image</p>
          <p className="text-[11px] text-secondary-txt mt-1">Click to expand</p>
        </div>

        {/* Expand Icon Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-lg bg-white/90 shadow-sm flex items-center justify-center border border-slate-200">
            <Expand className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Full Image */}
            <div className="w-full aspect-[3/2] bg-slate-100 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[15px] font-medium text-primary-txt">Receipt Image</p>
                <p className="text-[13px] text-secondary-txt mt-1">Click outside to close</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}