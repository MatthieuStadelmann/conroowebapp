export type Capacity = {
  current_capacity: number;
  max_capacity: number;
};

export type TimeSlot = {
  id: number;
  start_time: string;
  end_time: string;
  category: "green" | "yellow" | "red";
  capacity: Capacity;
};

export type SSEUpdate = {
  id: number;
  currentCapacity: number;
  category: "green" | "yellow" | "red";
};

