import { ActorStateHistory } from '@app/device/actorstatehistory.model';

export interface Actorstate {
    id: string;
    name: string;
    state: number;
    actorStateHistory?: ActorStateHistory;

    isLoading: boolean;
}
