"use client";

import React from "react";

export function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] shadow-md">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
