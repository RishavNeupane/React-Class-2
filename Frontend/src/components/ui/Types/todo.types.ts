export interface Todo {
  id: number
  title: string
  description: string
  status: Status
  priority: Priority
  dueDate: string
  createdAt: string
  updatedAt?: string
}

type statusType = 'pending' | 'in-progress' | 'completed' | 'cancelled';
type priorityType = 'low' | 'medium' | 'high';
