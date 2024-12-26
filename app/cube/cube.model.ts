import { rotateCW, rotateCCW, Dictionary } from "./cube.utils";
import { RotationDirection, cubeFacetNeighboursInfo, NeighbourInfo, FacetId } from "./cube.constants";

export class Cube {

    private readonly facetNeighbours: Dictionary<NeighbourInfo[]> = cubeFacetNeighboursInfo;

    private constructor(private facets: Dictionary<string[][]>) {};

    public rotate(facetId: string, direction: string): void {
        // rotate main facet
        let mainFacet = this.facets[facetId];
        mainFacet = direction == RotationDirection.Clockwise
            ? rotateCW(mainFacet)
            : rotateCCW(mainFacet);

        // rotate edges of neighbouring facets
        // get neighbour facets (with neighbour edge as the first row of the facet)
        let neighbours = this.facetNeighbours[facetId]
            .map(neighbourInfo => this.buildNeighbour(neighbourInfo))
            .map(neighbour => this.normalizeOrientation(neighbour));

        // swap top rows between the neighbouring facets 
        this.rotateTopRows(neighbours, direction);
        
        // return neighbour facets to the original orientation
        neighbours = neighbours.map(neighbour => this.resetOrientation(neighbour));

        // publish the result
        this.facets[facetId] = mainFacet;
        neighbours.forEach(neighbour => {
            const { neighbourId, neighbourFacet } = neighbour;
            this.facets[neighbourId] = neighbourFacet;
        });
    }

    public getFacets(): Dictionary<string[][]> {
        return this.facets;
    }

    private buildNeighbour(info: NeighbourInfo): Neighbour {
        const { neighbourId, neighbouringEdge } = info;
        const neighbourFacet = this.facets[neighbourId];
        return { neighbourId, neighbouringEdge, neighbourFacet };
    }

    /* rotates facet so the neighbouring edge is the first row of the facet */
    private normalizeOrientation(neighbour: Neighbour): Neighbour {
        const { neighbourId, neighbouringEdge } = neighbour;
        let { neighbourFacet } = neighbour;
        for (let i = 0; i < this.getNumberOfRotations(neighbouringEdge); i++)
            neighbourFacet = rotateCW(neighbourFacet);

        return { neighbourId, neighbouringEdge, neighbourFacet };
    }

    /* reverts normalizeOrientation */
    private resetOrientation(neighbour: Neighbour): Neighbour {
        const { neighbourId, neighbouringEdge } = neighbour;
        let { neighbourFacet } = neighbour;
        for (let i = 0; i < this.getNumberOfRotations(neighbouringEdge); i++)
            neighbourFacet = rotateCCW(neighbourFacet);

        return { neighbourId, neighbouringEdge, neighbourFacet };
    }

    private rotateTopRows(neighbours: Neighbour[], direction: string) {
        if (direction == RotationDirection.CounterClockwise)
            neighbours = neighbours.reverse();
    
        let edgeOfPreviouseNeighbour = neighbours[neighbours.length - 1].neighbourFacet[0];
        for (let i = 0; i < neighbours.length; i++) {
            const edgeForNextNeighbour = neighbours[i].neighbourFacet[0];
            neighbours[i].neighbourFacet[0] = [...edgeOfPreviouseNeighbour];
            edgeOfPreviouseNeighbour = edgeForNextNeighbour;
        }
        return neighbours;
    }

    private getNumberOfRotations(edge: number): number {
        // value reflects number of cw rotations needed to make neighbouring edge point upward
        return edge as number; 
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
