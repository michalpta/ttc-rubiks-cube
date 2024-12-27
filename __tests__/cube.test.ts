import { Color, FacetId, RotationDirection } from '../app/cube/cube.constants'
import { Cube } from '../app/cube/cube.model';
import { CubeState } from '../app/cube/cube.reducer';
 
describe('Cube', () => {
  it('rotates facets properly', () => {
    // arrange
    const state = CubeState.default();
    const instance = Cube.from(state.facets);

    // act
    const commands = [
        { facetId: FacetId.Front, direction: RotationDirection.Clockwise },
        { facetId: FacetId.Right, direction: RotationDirection.CounterClockwise },
        { facetId: FacetId.Up, direction: RotationDirection.Clockwise },
        { facetId: FacetId.Back, direction: RotationDirection.CounterClockwise },
        { facetId: FacetId.Left, direction: RotationDirection.Clockwise },
        { facetId: FacetId.Down, direction: RotationDirection.CounterClockwise },
    ];

    commands.forEach(({ facetId, direction }) => instance.rotate(facetId, direction));
    
    const result = instance.getFacets();
 
    // assert
    const { ORANGE, RED, GREEN, BLUE, WHITE, YELLOW } = Color;
    assertFacet(result[FacetId.Front], [
      [ORANGE, RED, RED],
      [ORANGE, GREEN, WHITE],
      [WHITE, WHITE, WHITE]
    ]);
    assertFacet(result[FacetId.Right], [
      [YELLOW, BLUE, ORANGE],
      [RED, RED, WHITE],
      [ORANGE, YELLOW, RED]
    ]);
    assertFacet(result[FacetId.Back], [
      [YELLOW, BLUE, WHITE],
      [ORANGE, BLUE, YELLOW],
      [YELLOW, YELLOW, WHITE]
    ]);
    assertFacet(result[FacetId.Left], [
      [GREEN, YELLOW, YELLOW],
      [ORANGE, ORANGE, GREEN],
      [BLUE, GREEN, ORANGE]
    ]);
    assertFacet(result[FacetId.Up], [
      [RED, ORANGE, GREEN],
      [BLUE, WHITE, WHITE],
      [BLUE, BLUE, BLUE]
    ]);
    assertFacet(result[FacetId.Down], [
      [GREEN, GREEN, BLUE],
      [RED, YELLOW, RED],
      [RED, GREEN, GREEN]
    ]);
  })
})

function assertFacet(facet: string[][], expectedFacet: string[][]) {
  facet.forEach((row, i) => row.forEach((resultColor, j) => {
    expect(resultColor).toBe(expectedFacet[i][j]);
  }));
}
