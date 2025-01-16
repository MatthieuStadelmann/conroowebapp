import { ref } from 'vue';
import type { SSEUpdate, ConnectionStatus } from "../types";
import type { SSEComposable } from "../types/composables";
import {
  STATUS_CONNECTED,
  STATUS_CONNECTING,
  STATUS_DISCONNECTED,
  STATUS_ERROR,
} from "../constants/connectionStatus";

export function useSSE(onUpdate: (update: SSEUpdate) => void): SSEComposable {
  const connectionStatus = ref<ConnectionStatus>(STATUS_DISCONNECTED);
  let eventSource: EventSource | null = null;

  const reconnectDelay = ref(1000);
  const maxDelay = 30000;

  const reconnect = () => {
    setTimeout(() => {
      startSSE();
      reconnectDelay.value = Math.min(reconnectDelay.value * 2, maxDelay);
    }, reconnectDelay.value);
  };

  const startSSE = (): void => {
    eventSource = new EventSource(import.meta.env.VITE_API_URL + "/sse");
    connectionStatus.value = STATUS_CONNECTING;

    eventSource.onopen = (): void => {
      connectionStatus.value = STATUS_CONNECTED;
    };

    eventSource.onmessage = (event: MessageEvent): void => {
      try {
        const update: SSEUpdate = JSON.parse(event.data);
        onUpdate(update);
      } catch (error) {
        console.error("Error processing SSE update:", error);
        connectionStatus.value = STATUS_ERROR;
      }
    };

    eventSource.onerror = (): void => {
      console.error("SSE connection failed. Retrying...");
      connectionStatus.value = STATUS_DISCONNECTED;
      eventSource?.close();
      reconnect();
    };
  };

  const closeSSE = (): void => {
    eventSource?.close();
    eventSource = null;
  };

  return {
    connectionStatus,
    startSSE,
    closeSSE,
  };
} 