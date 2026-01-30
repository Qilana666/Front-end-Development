import { create } from 'zustand';
import type { Todo } from '../types/index';
import { persist } from 'zustand/middleware'; 

export interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}
