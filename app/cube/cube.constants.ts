import { Dictionary } from "./cube.utils";

export class FacetId {
    static Front = 'F';
    static Right = 'R';
    static Back = 'B';
    static Left = 'L';
    static Up = 'U';
    static Down = 'D';
}

export class Color {
    static WHITE = 'white';
    static BLUE = 'blue';
    static GREEN = 'green';
    static RED = 'red';
    static YELLOW = 'yellow';
    static ORANGE = 'orange';
}

export class RotationDirection {
    static Clockwise = 'Clockwise';
    static CounterClockwise = 'CounterClockwise';
}

export class NeighbouringEdge {
    static Up = 0;
    static Left = 1;
    static Down = 2;
    static Right = 3;    
}

export interface NeighbourInfo {
    neighbourId: string;
    neighbouringEdge: number;
}

export const cubeFacetNeighbours: Dictionary<NeighbourInfo[]> = {
    [FacetId.Front]: [
        { neighbourId: FacetId.Up, neighbouringEdge: NeighbouringEdge.Down },
        { neighbourId: FacetId.Right, neighbouringEdge: NeighbouringEdge.Left },
        { neighbourId: FacetId.Down, neighbouringEdge: NeighbouringEdge.Up },
        { neighbourId: FacetId.Left, neighbouringEdge: NeighbouringEdge.Right },
    ],
    [FacetId.Right]: [
        { neighbourId: FacetId.Front, neighbouringEdge: NeighbouringEdge.Right },
        { neighbourId: FacetId.Up, neighbouringEdge: NeighbouringEdge.Right },
        { neighbourId: FacetId.Back, neighbouringEdge: NeighbouringEdge.Left },
        { neighbourId: FacetId.Down, neighbouringEdge: NeighbouringEdge.Right },
    ],
    [FacetId.Back]: [
        { neighbourId: FacetId.Right, neighbouringEdge: NeighbouringEdge.Right },
        { neighbourId: FacetId.Up, neighbouringEdge: NeighbouringEdge.Up },
        { neighbourId: FacetId.Left, neighbouringEdge: NeighbouringEdge.Left },
        { neighbourId: FacetId.Down, neighbouringEdge: NeighbouringEdge.Down },
    ],
    [FacetId.Left]: [
        { neighbourId: FacetId.Back, neighbouringEdge: NeighbouringEdge.Right },
        { neighbourId: FacetId.Up, neighbouringEdge: NeighbouringEdge.Left },
        { neighbourId: FacetId.Front, neighbouringEdge: NeighbouringEdge.Left },
        { neighbourId: FacetId.Down, neighbouringEdge: NeighbouringEdge.Left },
    ],
    [FacetId.Up]: [
        { neighbourId: FacetId.Front, neighbouringEdge: NeighbouringEdge.Up },
        { neighbourId: FacetId.Left, neighbouringEdge: NeighbouringEdge.Up },
        { neighbourId: FacetId.Back, neighbouringEdge: NeighbouringEdge.Up },
        { neighbourId: FacetId.Right, neighbouringEdge: NeighbouringEdge.Up },
    ],
    [FacetId.Down]: [
        { neighbourId: FacetId.Front, neighbouringEdge: NeighbouringEdge.Down },
        { neighbourId: FacetId.Right, neighbouringEdge: NeighbouringEdge.Down },
        { neighbourId: FacetId.Back, neighbouringEdge: NeighbouringEdge.Down },
        { neighbourId: FacetId.Left, neighbouringEdge: NeighbouringEdge.Down },
    ],
};
