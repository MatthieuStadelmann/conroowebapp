import type { Category } from "./TimeSlot";

type SSEUpdate = {
  id: number;
  currentCapacity: number;
  category: Category;
};

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";
