export interface ActorStateHistory {
    actorName: string;
    actorId: string;
    actorStateChanges: ActorStateChange[];
    lastActorPeriod?: ActorStateChange;
    lastOn?: number;
}

export interface ActorStateChange {
    timestamp: number;
    state: string;
    duration?: number;
}
