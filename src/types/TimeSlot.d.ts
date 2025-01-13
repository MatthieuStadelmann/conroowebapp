export type Category = "green" | "yellow" | "red";

export type Capacity = {
  current_capacity: number;
  max_capacity: number;
};

export type TimeSlot = {
  id: number;
  start_time: string;
  end_time: string;
  category: Category;
  capacity: Capacity;
};

export type SSEUpdate = {
  id: number;
  currentCapacity: number;
  category: Category;
};
