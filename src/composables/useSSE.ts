import { ref } from 'vue';
import type { ConnectionStatus, SSEUpdate } from "../types";
import {
  STATUS_CONNECTED,
  STATUS_CONNECTING,
  STATUS_DISCONNECTED,
  STATUS_ERROR,
} from "../constants/connectionStatus";

export function useSSE(onUpdate: (update: SSEUpdate) => void) {
  const connectionStatus = ref<ConnectionStatus>(STATUS_DISCONNECTED);
  let eventSource: EventSource | null = null;

  const startSSE = () => {
    eventSource = new EventSource(import.meta.env.VITE_API_URL + "/sse");
    connectionStatus.value = STATUS_CONNECTING;

    eventSource.onopen = () => {
      connectionStatus.value = STATUS_CONNECTED;
    };

    eventSource.onmessage = (event) => {
      try {
        const update: SSEUpdate = JSON.parse(event.data);
        onUpdate(update);
      } catch (error) {
        console.error("Error processing SSE update:", error);
        connectionStatus.value = STATUS_ERROR;
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection failed. Retrying...");
      connectionStatus.value = STATUS_DISCONNECTED;
      eventSource?.close();
      setTimeout(startSSE, 5000);
    };
  };

  const closeSSE = () => {
    eventSource?.close();
    eventSource = null;
  };

  return {
    connectionStatus,
    startSSE,
    closeSSE,
  };
} 