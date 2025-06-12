// Authentication types and utilities

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

// Predefined users for demonstration purposes
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator'
  },
  {
    id: '2',
    username: 'pr1admin',
    password: 'pr1pass',
    role: 'admin',
    name: 'Project 1 Administrator'
  },
  {
    id: '3',
    username: 'user1',
    password: 'user123',
    role: 'user',
    name: 'Regular User 1'
  },
  {
    id: '4',
    username: '3user',
    password: '3userpass',
    role: 'user',
    name: 'User Three'
  },
  {
    id: '5',
    username: 'testuser',
    password: 'test123',
    role: 'user',
    name: 'Test User'
  }
];

// Simple authentication function
export function authenticateUser(username: string, password: string): User | null {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
}

// Get user by ID
export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}