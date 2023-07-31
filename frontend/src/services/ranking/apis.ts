import type {
    GameParticipant
} from './utils';

export interface Rankings {
    rank: number;
    clearTime: string;
    clearDate: string;
    participants: GameParticipant[];
    currentPage: number;
    isLastPage: boolean;
  }