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
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="rounded-full bg-primary/10 flex items-center justify-center w-10 h-10">
          <Bell size={22} className="text-primary" />
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
            {notification?.title}
          </p>
          <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
            {notification?.message}
          </p>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="secondary" className="text-xs">
              {formatConstant(notification.type)}
            </Badge>
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
// Main Notification Bar / Modal Component
// ────────────────────────────────────────────────
const NotificationBar = ({
  isOpen,
  onClose,
  notifications,
  onLoadMore,
  hasMore,
  loading,
  onMarkAllRead,
}: {
  isOpen: boolean
  onClose: () => void
  notifications: any[]
  onLoadMore: () => void
  hasMore: boolean
  loading: boolean
  onMarkAllRead: () => void
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Improved mobile body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const isMobile = window.innerWidth < 640
    if (!isMobile) return

    const scrollY = window.scrollY

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // Infinite scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || loading || !hasMore) return

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      if (scrollHeight - scrollTop - clientHeight < 120) {
        onLoadMore()
      }
    }

    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll)
      return () => el.removeEventListener('scroll', handleScroll)
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
      className={`
        fixed inset-0 z-50 flex flex-col bg-white
        sm:inset-auto sm:top-24 sm:right-4 sm:w-96 sm:max-h-[calc(100vh-6rem)] 
        sm:rounded-xl sm:shadow-2xl sm:border sm:border-gray-200
      `}
    >
      {/* Header - fixed/sticky look */}
      <div className="shrink-0 border-b z-10">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center gap-2">
            <Link href="/notifications" onClick={onClose}>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
            <Button size="sm" onClick={onMarkAllRead}>
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        ref={scrollRef}
        className={`
          flex-1 overflow-y-auto -webkit-overflow-scrolling:touch overscroll-contain
          md:min-h-[80vh]
        `}
      >
        {notifications?.length > 0 ? (
          notifications.map((notif: any, index: number) => (
            <NotificationItem
              key={notif.id ?? index}
              notification={notif}
              onClick={() => {
                // Add your read + redirect logic here if needed
              }}
            />
          ))
        ) : loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Bell className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-center">No notifications yet</p>
          </div>
        )}

        {loading && notifications?.length > 0 && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {!hasMore && notifications?.length > 0 && (
          <div className="text-center py-6 text-sm text-gray-500">
            No more notifications
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationBar