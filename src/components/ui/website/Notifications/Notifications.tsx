'use client'

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProfile } from '@/hooks/context/ProfileContext';
import useSocket from '@/hooks/useSocket';
import { myFetch } from '@/utils/myFetch';
import { Bell, Heart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '../../avatar';
import { Badge } from '../../badge';
import { FormatDate } from '@/components/shared/FormatDate';

const NotificationItem = ({ notification, onClick }: any) => {
  // Map notification types to icons and colors
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'REQUESTED':
        return { icon: Bell, color: 'bg-blue-100' };
      case 'APPROVED':
        return { icon: Heart, color: 'bg-green-100' };
      case 'REJECTED':
        return { icon: X, color: 'bg-red-100' };
      default:
        return { icon: Bell, color: 'bg-gray-100' };
    }
  };

  const { icon: Icon, color } = getTypeIcon(notification.type);

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  function formatConstant(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

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
            <Badge variant="destructive">{formatConstant(notification.type)}</Badge>
            <p className="text-xs text-gray-500 ">{FormatDate(notification?.createdAt ?? notification?.updatedAt)}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const Notifications = ({profile}:{profile: any}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef(null);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);
  

   const socket = useSocket();
  
    // ✅ FIX 2: Proper socket listener with cleanup
    useEffect(() => {
      if (!profile?._id || !socket) return;
  
      const eventName = `notification::${profile?._id}`;
  
      const handleNewMessage = async () => {        
        getNotificationData()
      }
      socket.on(eventName, handleNewMessage);    
      return () => {
        socket.off(eventName, handleNewMessage);
      }
    }, [profile?._id, socket])

  const getNotificationData = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const response = await myFetch(`/notifications?page=${pageNum}`, { 
        cache: "no-cache" 
      });
      
      if (response?.success) {
        const { result, unreadCount } = response?.data;
        
        // Update unread count only on first load
        if (pageNum === 1) {
          setUnreadCount(unreadCount);
        }
        
        // Append new notifications to existing ones
        setNotifications(prev => pageNum === 1 ? result : [...prev, ...result]);
        
        // Update pagination state
        setTotalPages(Number(response?.meta?.totalPage));
        setHasMore(pageNum < Number(response?.meta?.totalPage));
      }
    } catch (error) {
      console.log("notification error", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    getNotificationData(nextPage);
  };

  const markAllAsRead = async () => {
    try {
      // Call your API to mark all as read
      await myFetch("/notifications", { method: "PATCH" });
      
      // Update local state
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.log("Mark all as read error", error);
    }
  };

  useEffect(() => {
    getNotificationData(1);
  }, []);

  // Scroll event handler
  const handleScroll = (e: any) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // Calculate how close we are to the bottom (trigger when 100px from bottom)
    const threshold = 100;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    
    if (isNearBottom && hasMore && !loading) {
      loadMore();
    }
  };

  return (
    <div className="my-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="bg-white shadow-lg">
          <header className="shadow-sm sticky top-0 z-40 bg-white rounded-t-lg">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
              >
                Mark all as read
              </Button>
            </div>
          </header>
      
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="divide-y min-h-[30vh] max-h-[62vh] overflow-y-auto"
          >
            {notifications.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Bell className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No notifications yet
                </h3>
                <p className="text-sm text-gray-500">
                  When you get notifications, they'll show up here
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem 
                  key={notif._id} 
                  notification={notif}
                  onClick={() => console.log('Clicked:', notif._id)}
                />
              ))
            )}
            
            {loading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            )}
            
            {!hasMore && notifications.length > 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                You're all caught up! No more notifications
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;