"use client";

import React, { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // For SSR safety, only render portal on client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div style={{ display: 'flex', minHeight: '100dvh', padding: '18px 0 18px 18px', position: 'relative' }}>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}