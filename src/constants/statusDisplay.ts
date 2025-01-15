import {
  STATUS_CONNECTED,
  STATUS_CONNECTING,
  STATUS_DISCONNECTED,
  STATUS_ERROR,
} from "./connectionStatus";

export const STATUS_CLASSES: Record<string, string> = {
  [STATUS_CONNECTING]: "bg-blue-400",
  [STATUS_CONNECTED]: "bg-green-500",
  [STATUS_DISCONNECTED]: "bg-red-500",
  [STATUS_ERROR]: "bg-yellow-500",
};

export const STATUS_ANIMATION_CLASSES: Record<string, string> = {
  [STATUS_CONNECTING]: "animate-ping bg-blue-400",
  [STATUS_CONNECTED]: "animate-ping bg-green-400",
};

export const STATUS_MESSAGES: Record<string, string> = {
  [STATUS_CONNECTING]: "Connecting",
  [STATUS_CONNECTED]: "Live updates",
  [STATUS_DISCONNECTED]: "Disconnected",
  [STATUS_ERROR]: "Error processing updates",
}; 