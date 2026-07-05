"use client";

import { useState } from "react";
import { Bell, Clock, AlertCircle, Calendar, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "attendance" | "expense" | "timeoff" | "vehicle" | "system";
  isRead: boolean;
  link?: string;
}

interface NotificationsDropdownProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllRead?: () => void;
}

const ICON_MAP = {
  attendance: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
  expense: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
  timeoff: { icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
  vehicle: { icon: Truck, color: "text-green-500", bg: "bg-green-50" },
  system: { icon: Bell, color: "text-slate-500", bg: "bg-slate-50" },
};

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New attendance alert",
    description: "Carlos Vega submitted a manual punch for review",
    time: "5 min ago",
    type: "attendance",
    isRead: false,
  },
  {
    id: "2",
    title: "Expense pending approval",
    description: "Marcus Rivera has a new expense awaiting review",
    time: "1 hour ago",
    type: "expense",
    isRead: false,
  },
  {
    id: "3",
    title: "Time off request",
    description: "Priya Sharma requested vacation time (Jun 20-27)",
    time: "3 hours ago",
    type: "timeoff",
    isRead: true,
  },
  {
    id: "4",
    title: "Vehicle maintenance alert",
    description: "Van #07 is due for oil change (overdue by 1,200 km)",
    time: "5 hours ago",
    type: "vehicle",
    isRead: true,
  },
  {
    id: "5",
    title: "System update",
    description: "New feature: Export reports to CSV format",
    time: "1 day ago",
    type: "system",
    isRead: true,
  },
];

export function NotificationsDropdown({
  notifications = DEFAULT_NOTIFICATIONS,
  onNotificationClick,
  onMarkAllRead,
}: NotificationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const unreadCount = localNotifications.filter((n) => !n.isRead).length;

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClose = () => setIsOpen(false);

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setLocalNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    onNotificationClick?.(notification);
    handleClose();
  };

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
    onMarkAllRead?.();
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className={cn(
          "relative w-10 h-10 rounded-xl flex items-center justify-center",
          "bg-white border border-slate-200/80 shadow-sm",
          "hover:bg-slate-50 hover:border-slate-300 transition-all duration-200",
          "text-[#667085] hover:text-[#0F172B]",
          isOpen && "bg-slate-50 border-slate-300"
        )}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4.5 h-4.5" strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] z-50">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#667085]" strokeWidth={1.8} />
                  <span className="text-[14px] font-semibold text-[#0F172B]">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold text-white bg-red-500 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-[#135CC8] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                {localNotifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-[13px] text-[#667085]">No notifications</p>
                  </div>
                ) : (
                  localNotifications.map((notification) => {
                    const { icon: Icon, color, bg } = ICON_MAP[notification.type] || ICON_MAP.system;
                    return (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={cn(
                          "w-full flex items-start gap-3 px-4 py-3",
                          "hover:bg-slate-50 transition-colors text-left",
                          "focus:outline-none",
                          !notification.isRead && "bg-blue-50/30"
                        )}
                      >
                        {/* Icon */}
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", bg)}>
                          <Icon className={cn("w-4 h-4", color)} strokeWidth={1.8} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[13px] font-semibold text-[#0F172B] leading-tight">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-[12px] text-[#667085] mt-0.5 leading-snug">
                            {notification.description}
                          </p>
                          <p className="text-[10px] text-[#90A1B9] mt-1 font-medium">
                            {formatTime(notification.time)}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
                <button
                  onClick={() => {
                    console.log("View all notifications");
                    handleClose();
                  }}
                  className="w-full text-center text-[12px] font-semibold text-[#135CC8] hover:underline"
                >
                  View all notifications
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}