'use client'

import React, { useRef, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { FormatDate } from '../FormatDate'

// ────────────────────────────────────────────────
// Notification Item Component
// ────────────────────────────────────────────────
const NotificationItem = ({ notification, onClick }: any) => {
  function formatConstant(str: string): string {
    return str
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer border-b ${!notification.read ? 'bg-blue-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="rounded-full cursor-pointer bg-primary flex items-center justify-center w-10 h-10">
          <Bell size={25} className="text-slate-200" />
        </Avatar>

        <div className="flex-1">
          <p className={`text-sm ${notification.read ? '' : 'font-bold'}`}>
            {notification?.title}
          </p>
          <p className="text-sm">{notification?.message}</p>
          <div className="flex items-center justify-between pt-2">
            <Badge variant="destructive">{formatConstant(notification.type)}</Badge>
            <p className="text-xs text-gray-500">
              {FormatDate(notification?.createdAt ?? notification?.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────
// Notification Bar / Modal Component
// ────────────────────────────────────────────────
const NotificationBar = ({
  isOpen,
  onClose,
  notifications,
  onLoadMore,
  hasMore,
  loading,
  onMarkAllRead,
}: any) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Disable body scroll on mobile when modal is open
  useEffect(() => {
    if (!isOpen) return

    const isMobile = window.innerWidth < 640
    if (!isMobile) return

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Infinite scroll / load more trigger
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || loading || !hasMore) return

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      if (scrollHeight - scrollTop - clientHeight < 100) {
        onLoadMore()
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [loading, hasMore, onLoadMore])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="
        fixed inset-0 z-50 flex flex-col bg-white shadow-xl border-l 
        sm:inset-auto sm:top-24 sm:right-3 sm:w-96 
        sm:min-h-[85vh] sm:max-h-[85vh] sm:rounded-lg
      "
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-center gap-2">
          <Link href="/notifications" onClick={() => onClose()}>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
          <Button size="sm" onClick={onMarkAllRead}>
            Read All
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        {notifications?.length > 0 ? (
          notifications.map((notif: any, index: number) => (
            <NotificationItem key={index} notification={notif} />
          ))
        ) : !hasMore && notifications?.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500">
            No Notifications
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            No more notifications
          </div>
        )}

        {loading && (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationBar