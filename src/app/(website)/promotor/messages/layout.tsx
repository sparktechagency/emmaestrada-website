"use client";

import Container from "@/components/shared/Container";
import MessageSidebar from "@/components/ui/website/Messages/MessageSidebar";
import { myFetch } from "@/utils/myFetch";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams() as { chatId?: string };
  const router = useRouter();
  useEffect(()=>{
    router.refresh()
  },[router])

    const isMobileChatView =
    params?.chatId &&
    typeof window !== "undefined" &&
    window.innerWidth < 640;

  if (isMobileChatView) {
    return <section className="h-full w-full px-3 py-5">{children}</section>;
  }

  // Normal desktop + mobile sidebar view
  return (
    <Container>
      <section className="h-full grid grid-cols-1 sm:grid-cols-9 py-5 gap-3">
        <aside className="col-span-1 sm:col-span-3">
          <MessageSidebar/>
        </aside>
        <main className="hidden sm:block sm:col-span-6">{children}</main>
      </section>
    </Container>
  );
}