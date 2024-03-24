import React from "react";

export default function LoadingCard() {
  return (
    <div className="min-h-max bg-gradient-to-b bg-gray-400 to-indigo-500 flex items-center justify-center top-0">
      <div className="bg-white p-4 rounded-md m-1">
        <div className="w-64 h-44 bg-gray-200 animate-pulse"></div>
        <div className="mt-8 h-32 w-full space-y-3">
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md m-1">
        <div className="w-64 h-44 bg-gray-200 animate-pulse"></div>
        <div className="mt-8 h-32 w-full space-y-3">
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md m-1">
        <div className="w-64 h-44 bg-gray-200 animate-pulse"></div>
        <div className="mt-8 h-32 w-full space-y-3">
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
