'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Heart, MessageCircle, UserPlus, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock notification data generator
const generateNotification = (id:any) => {
  const types = [
    { icon: Heart, text: 'liked your post', color: 'bg-red-100' },
    { icon: MessageCircle, text: 'commented on your post', color: 'bg-blue-100' },
    { icon: UserPlus, text: 'started following you', color: 'bg-green-100' },
    { icon: User, text: 'tagged you in a post', color: 'bg-purple-100' }
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const names = ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Rodriguez', 'Jessica Brown'];
  
  return {
    id,
    user: names[Math.floor(Math.random() * names.length)],
    avatar: `https://i.pravatar.cc/150?img=${id % 70}`,
    type: type.text,
    icon: type.icon,
    iconColor: type.color,
    time: id < 5 ? `${Math.floor(Math.random() * 60)}m` : id < 15 ? `${Math.floor(Math.random() * 24)}h` : `${Math.floor(Math.random() * 30)}d`,
    read: id > 3 && Math.random() > 0.5
  };
};

const NotificationItem = ({ notification, onClick }:any) => {
  const Icon = notification.icon;
  
  return (
    <div
      onClick={onClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer border-b ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={notification.avatar} />
          <AvatarFallback>{notification.user[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold">{notification.user}</span>{' '}
            <span className="text-gray-600">{notification.type}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{notification.time} ago</p>
        </div>                
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef(null);

  // Initialize notifications
  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => generateNotification(i));
    // @ts-ignore
    setNotifications(initial);
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const newPage = page + 1;
      const newNotifications = Array.from(
        { length: 10 }, 
        (_, i) => generateNotification(page * 15 + i)
      );
      
      setNotifications(prev => [...prev, ...newNotifications]);
      setPage(newPage);
      setLoading(false);
      
      if (newPage >= 5) setHasMore(false);
    }, 1000);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  // Scroll event handler
  const handleScroll = (e:any) => {
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
        <Card className="bg-white">
          <header className="shadow-sm sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 pb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Notifications</h1>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
            {notifications.map((notif) => (
              <NotificationItem 
                key={notif.id} 
                notification={notif}
                onClick={() => console.log('Clicked:', notif.id)}
              />
            ))}
            
            {loading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            )}
            
            {!hasMore && notifications.length > 0 && (
              <div className="p-4 text-center text-gray-500">
                No more notifications
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;


// export default function Notifications() {
//   const [view, setView] = useState('bar');
//   const [isBarOpen, setIsBarOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Initialize notifications
//   useEffect(() => {
//     const initial = Array.from({ length: 15 }, (_, i) => generateNotification(i));
//     setNotifications(initial);
//   }, []);

//   const loadMore = () => {
//     if (loading || !hasMore) return;
    
//     setLoading(true);
//     setTimeout(() => {
//       const newPage = page + 1;
//       const newNotifications = Array.from(
//         { length: 10 }, 
//         (_, i) => generateNotification(page * 15 + i)
//       );
      
//       setNotifications(prev => [...prev, ...newNotifications]);
//       setPage(newPage);
//       setLoading(false);
      
//       if (newPage >= 5) setHasMore(false);
//     }, 1000);
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
//   };

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <h1 className="text-xl font-bold text-blue-600">facebook</h1>
//             <div className="flex gap-2">
//               <Button
//                 variant={view === 'bar' ? 'default' : 'outline'}
//                 onClick={() => setView('bar')}
//                 size="sm"
//               >
//                 Notification Bar
//               </Button>
//               <Button
//                 variant={view === 'page' ? 'default' : 'outline'}
//                 onClick={() => setView('page')}
//                 size="sm"
//               >
//                 Notification Page
//               </Button>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={() => {
//                 if (view === 'bar') {
//                   setIsBarOpen(!isBarOpen);
//                 } else {
//                   setView('page');
//                 }
//               }}
//             >
//               <Bell className="h-6 w-6" />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {unreadCount > 9 ? '9+' : unreadCount}
//                 </span>
//               )}
//             </Button>
//             <Button variant="ghost" size="icon">
//               <Settings className="h-6 w-6" />
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-16">
//         {view === 'bar' ? (
//           <div className="max-w-7xl mx-auto px-4 py-8">
//             <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
//             <p className="text-gray-600">Click the notification bell icon to view your notifications in the dropdown bar.</p>
//             <NotificationBar
//               isOpen={isBarOpen}
//               onClose={() => setIsBarOpen(false)}
//               notifications={notifications}
//               onLoadMore={loadMore}
//               hasMore={hasMore}
//               loading={loading}
//               onMarkAllRead={markAllAsRead}
//             />
//           </div>
//         ) : (
//           <NotificationPage
//             notifications={notifications}
//             onLoadMore={loadMore}
//             hasMore={hasMore}
//             loading={loading}
//             onMarkAllRead={markAllAsRead}
//           />
//         )}
//       </div>
//     </div>
//   );
// }