import {HTTP_METHODS} from "@/constants/ServiceConstants";
import {NOTIFICATION_COLORS, NOTIFICATION_ICONS} from "@/constants/NotificationConstants";

export type HttpMethods = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

export type NotificationColors = typeof NOTIFICATION_COLORS[keyof typeof NOTIFICATION_COLORS]

export type NotificationIcons = typeof NOTIFICATION_ICONS[keyof typeof NOTIFICATION_ICONS]
