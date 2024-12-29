import { rotateCW, rotateCCW, Dictionary } from "./cube.utils";
import { RotationDirection, cubeFacetNeighboursInfo, NeighbourInfo, FacetId } from "./cube.constants";

export class Cube {

    private readonly facetNeighboursInfo: Dictionary<NeighbourInfo[]> = cubeFacetNeighboursInfo;

    private constructor(private facets: Dictionary<string[][]>) {};

    public rotate(facetId: string, direction: string): void {
        // rotate main facet
        const mainFacet = direction == RotationDirection.Clockwise
            ? rotateCW(this.facets[facetId])
            : rotateCCW(this.facets[facetId]);

        // rotate edges of neighbouring facets...
        // get neighbour facets
        const neighbours = this.facetNeighboursInfo[facetId]
            .map(neighbourInfo => this.buildNeighbour(neighbourInfo));

        // rotate neighbour facets so the neighbouring edge is the first top row of the facet
        neighbours.forEach(neighbour => this.normalizeOrientation(neighbour));
        
        // swap top rows between the neighbouring facets 
        this.swapTopRowsBetween(neighbours, direction);

        // return neighbour facets to their original orientation
        neighbours.forEach(neighbour => this.resetOrientation(neighbour));

        // publish the result
        this.facets[facetId] = mainFacet;
        neighbours
            .forEach(neighbour => this.facets[neighbour.neighbourId] = neighbour.neighbourFacet);
    }

    public getFacets(): Dictionary<string[][]> {
        return this.facets;
    }

    private buildNeighbour(info: NeighbourInfo): Neighbour {
        const { neighbourId, neighbouringEdge } = info;
        const neighbourFacet = this.facets[neighbourId];
        return { neighbourId, neighbouringEdge, neighbourFacet };
    }

    private normalizeOrientation(neighbour: Neighbour): void {
        let facet = neighbour.neighbourFacet;
        for (let i = 0; i < this.getNumberOfRotations(neighbour.neighbouringEdge); i++)
            facet = rotateCW(facet);

        neighbour.neighbourFacet = facet;
    }

    private resetOrientation(neighbour: Neighbour): void {
        let facet = neighbour.neighbourFacet;
        for (let i = 0; i < this.getNumberOfRotations(neighbour.neighbouringEdge); i++)
            facet = rotateCCW(facet);

        neighbour.neighbourFacet = facet;
    }

    private swapTopRowsBetween(neighbours: Neighbour[], direction: string): void {
        if (direction == RotationDirection.CounterClockwise)
            neighbours = neighbours.reverse();
    
        const topRowIdx = 0;
        let edgeOfPreviousNeighbour = neighbours[neighbours.length - 1].neighbourFacet[topRowIdx];
        neighbours.forEach((neighbour) => {
            const edgeForNextNeighbour = neighbour.neighbourFacet[topRowIdx];
            neighbour.neighbourFacet[topRowIdx] = [...edgeOfPreviousNeighbour];
            edgeOfPreviousNeighbour = edgeForNextNeighbour;
        });
    }

    private getNumberOfRotations(edge: number): number {
        // value reflects number of CW rotations needed to make neighbouring edge point upward
        return edge; 
    }

    public static from(facets: Dictionary<string[][]>): Cube {
        const cubeFacets: Dictionary<string[][]> = {};
        Object.values(FacetId)
            .forEach(id => cubeFacets[id] = facets[id].map(row => [...row]));

        return new Cube(cubeFacets);  
    }
}

export interface Neighbour {
    neighbourId: string;
    neighbouringEdge: number;
    neighbourFacet: string[][];
}
