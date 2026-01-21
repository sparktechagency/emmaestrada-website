// MobileChatView.tsx
"use client";

import { useEffect, useState } from "react";

export default function MobileChatView({
  children,
  chatId,
}: {
  children: React.ReactNode;
  chatId?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || !chatId) {
    return null;
  }

  return (
    <section className="h-full w-full px-3 py-5 sm:hidden">
      {children}
    </section>
  );
}