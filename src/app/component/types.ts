// src/types.ts

export type Priority = 'high' | 'medium' | 'low' | 'normal';
export interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: Priority;
    tag: string;
    deadline: string;
  }
  
  