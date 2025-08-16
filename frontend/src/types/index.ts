export interface Event {
  id: string;
  name: string;
  type: 'corporativo' | 'social' | 'educacional' | 'esportivo' | 'cultural';
  date: string;
  description?: string;
  budget?: number;
  participants_count?: number;
  user_id: string;
  scrumBoards?: ScrumBoard[];
}

export interface ScrumBoard {
  id: string;
  event_id: string;
  sprint_duration: number;
  team_size: number;
  objectives?: string;
  complexity: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  tasks?: Task[];
}

export interface Task {
  id: string;
  scrum_board_id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  story_points: number;
  priority: 'low' | 'medium' | 'high';
  acceptance_criteria?: string;
  assigned_to?: string;
}

export interface ScrumFormData {
  sprint_duration: number;
  team_size: number;
  objectives: string;
  complexity: 'low' | 'medium' | 'high';
}