"use client";

import Container from "@/components/shared/Container";
import MessageSidebar from "@/components/ui/website/Messages/MessageSidebar";
import { myFetch } from "@/utils/myFetch";

import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(null)
  
  const params = useParams() as { chatId?: string };

  // On mobile, if a chatId is present, hide sidebar, show main content full width
  if (
    params?.chatId &&
    typeof window !== "undefined" &&
    window.innerWidth < 640
  ) {
    return <section className="h-full w-full px-3 py-5">{children}</section>;
  }

    const fetchProfile = async () => {
      try {
  
        const res = await myFetch("/users/profile", { tags: ["profile"] });
  
        if (res?.success) {
          setProfile(res?.data);
          if (typeof window !== 'undefined') {
            localStorage.setItem("role", res?.data?.role);
          }
        } else {
          console.log(res?.message);
        }
      } catch (err: any) {
        console.log(err?.message);
      }
    };
  
    useEffect(() => {
      fetchProfile()
    }, [])

  return (
    <Container>
    <section className="h-full grid grid-cols-1 sm:grid-cols-9 py-5 gap-3">
      <aside className="col-span-1 sm:col-span-3">
          <Suspense fallback={<div>Loading...</div>}>
        <MessageSidebar profile={profile}/>
        </Suspense>
      </aside>
      <main className="hidden sm:block sm:col-span-6">{children}</main>
    </section>
    </Container>
  );
}
