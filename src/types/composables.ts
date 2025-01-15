import type { Ref } from 'vue';
import type { ConnectionStatus } from './index';

export interface SSEComposable {
  connectionStatus: Ref<ConnectionStatus>;
  startSSE: () => void;
  closeSSE: () => void;
} 