export type Category = "green" | "yellow" | "red";

type Capacity = {
  current_capacity: number;
  max_capacity: number;
};

type TimeSlot = {
  id: number;
  start_time: string;
  end_time: string;
  category: Category;
  capacity: Capacity;
};
