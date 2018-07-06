export interface ActorStateHistory {
    actorName: string;
    actorStateChanges: ActorStateChange[];
    lastActorPeriod?: ActorStateChange;
    lastOn?: number;
}

export interface ActorStateChange {
    timestamp: number;
    state: number;
    duration?: number;
}
