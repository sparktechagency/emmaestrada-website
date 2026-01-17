'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Heart, MessageCircle, UserPlus, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { IoNotificationsCircleOutline } from 'react-icons/io5';
import { FormatDate } from '../FormatDate';
import { Badge } from '@/components/ui/badge';


const NotificationItem = ({ notification, onClick }: any) => {
  const Icon = notification.icon;

  return (
    <div
      onClick={onClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer border-b ${!notification.read ? 'bg-blue-50' : ''
        }`}
    >
      <div className="flex items-start gap-3">

        <Avatar className="rounded-full cursor-pointer bg-primary flex items-center justify-center w-10 h-10">
          <Bell size={25} className='text-slate-200' />
        </Avatar>

        <div className="flex-1">
          <p className={`text-sm ${notification.read ?  "" : "font-bold"}`}>{notification?.title}</p>
          <p className="text-sm">{notification?.message}</p>
          <div className="flex items-center justify-between pt-2">
            <Badge variant="destructive">{notification.type}</Badge>
            <p className="text-xs text-gray-500 ">{FormatDate(notification?.createdAt ?? notification?.updatedAt)}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const NotificationBar = ({ isOpen, onClose, notifications, onLoadMore, hasMore, loading, onMarkAllRead }: any) => {  
  
  const scrollRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        onLoadMore();
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // @ts-ignore
      scrollElement.addEventListener('scroll', handleScroll);
      // @ts-ignore
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [loading, hasMore, onLoadMore]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed top-24 right-3 h-full min-h-[85vh] max-h-[85vh]  w-96 bg-white shadow-xl no-scrollbar! border-l flex flex-col z-50 rounded-lg"
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-center gap-2">
          <Link href="/notifications" onClick={()=>onClose()}> <Button variant="ghost" size="sm">
            View All
          </Button></Link>
          <Button size="sm" onClick={onMarkAllRead}>
            Read All
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div ref={scrollRef} className="flex-1  overflow-y-auto">
        {notifications?.length > 0 ? notifications?.map((notif: any, index:number) => (
          <NotificationItem
            key={index}
            notification={notif}
            onClick={() => console.log('Clicked:', notif.id)}
          />
        )) : !hasMore && notifications.length > 0 ? (
          <div className="text-center py-4 text-sm text-gray-500">
            No more notifications
          </div>
        )
      
      : !hasMore && notifications.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500">
            No Notifications
          </div>
        )}

        {loading && (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}

      </div>
    </div>
  );
};

export default NotificationBar;