import { Color, FacetId } from "./cube.constants";
import { Cube } from "./cube.model";
import { Dictionary } from "./cube.utils";

const { ORANGE, RED, GREEN, BLUE, WHITE, YELLOW } = Color;

/* STATE */
export class CubeState {
    facets!: Dictionary<string[][]>; 

    static default(): CubeState {
        return {
            facets: {
                [FacetId.Front]: buildColorArray(GREEN),
                [FacetId.Right]: buildColorArray(RED),
                [FacetId.Back]: buildColorArray(BLUE),
                [FacetId.Left]: buildColorArray(ORANGE),
                [FacetId.Up]: buildColorArray(WHITE),
                [FacetId.Down]: buildColorArray(YELLOW),
            }
        };
    }
}

/* ACTIONS */
class CubeActionType {
    static CubeRotate = 'CubeRotate';
    static CubeReset = 'CubeReset';
}
type CubeAction = CubeRotateAction | CubeResetAction;
export class CubeRotateAction {
    readonly type = CubeActionType.CubeRotate;
    constructor(public facetId: string, public direction: string) {}
}
export class CubeResetAction {
    readonly type = CubeActionType.CubeReset;
}

/* REDUCER */
export const cubeReducer = ({ facets }: CubeState, action: CubeAction): CubeState => {
    if (action.type === CubeActionType.CubeRotate) {
        const { facetId, direction } = action as CubeRotateAction;
        const cube = Cube.from(facets);
        cube.rotate(facetId, direction);
        return { facets: cube.getFacets() };
    }
    if (action.type === CubeActionType.CubeReset) {
        return CubeState.default();
    }
    return { facets };
};

function buildColorArray(color: string | null): string[][] {
    return Array(3).fill(null).map(() => Array(3).fill(color));
};
