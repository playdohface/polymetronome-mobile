export interface Sound {
    name: string;
    play(startTime: number): void;
    set outputNode(newOut: AudioNode);
}

