import { ActorStateHistory } from '@app/core/actorstatehistory.model';

export interface Actorstate {
    id: string;
    name: string;
    state: number;
    actorStateHistory?: ActorStateHistory;

    isLoading: boolean;
}
