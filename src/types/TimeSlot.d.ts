export type Category = "green" | "yellow" | "red";

export interface RawTimeSlot {
  id: number;
  start_time?: string;
  startTime?: string;
  end_time?: string;
  endTime?: string;
  category: Category;
  capacity: {
    current_capacity?: number;
    current?: number;
    max_capacity?: number;
    maximum?: number;
  };
}


export interface Capacity {
  current_capacity: number;
  max_capacity: number;
}

export interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  category: Category;
  capacity: Capacity;
}
