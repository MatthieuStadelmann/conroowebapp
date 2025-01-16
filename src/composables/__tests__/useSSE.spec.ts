import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useSSE } from '../useSSE';
import { STATUS_CONNECTED, STATUS_CONNECTING } from '../../constants/connectionStatus';
import { CATEGORY_YELLOW } from '../../constants/categories';

class MockEventSource {
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: (() => void) | null = null;
  readyState = 0;
  
  constructor(public url: string) {}
  
  close() {
    this.readyState = 2;
  }

  dispatchEvent(event: Event) {
    if (event.type === 'open' && this.onopen) {
      this.onopen(event);
    }
    if (event.type === 'message' && this.onmessage) {
      this.onmessage(event as MessageEvent);
    }
    if (event.type === 'error' && this.onerror) {
      this.onerror();
    }
    return true;
  }
}

describe('useSSE', () => {
  let mockEventSource: MockEventSource;

  beforeEach(() => {
    mockEventSource = new MockEventSource('');
    vi.stubGlobal('EventSource', vi.fn(() => mockEventSource));
  });

  it('should handle SSE connection lifecycle', () => {
    const onUpdate = vi.fn();
    const { connectionStatus, startSSE, closeSSE } = useSSE(onUpdate);
    
    startSSE();
    expect(connectionStatus.value).toBe(STATUS_CONNECTING);
    
    mockEventSource.onopen?.(new Event('open'));
    expect(connectionStatus.value).toBe(STATUS_CONNECTED);
    
    closeSSE();
    expect(mockEventSource.readyState).toBe(2);
  });

  it('should call onUpdate with parsed SSE message', () => {
    const onUpdate = vi.fn();
    const { startSSE } = useSSE(onUpdate);
    
    startSSE();
    const mockUpdate = {
      id: 1,
      currentCapacity: 6,
      category: CATEGORY_YELLOW
    };
    
    mockEventSource.onmessage?.(new MessageEvent('message', {
      data: JSON.stringify(mockUpdate)
    }));

    expect(onUpdate).toHaveBeenCalledWith(mockUpdate);
  });
}); 