import { Fragment, useReducer } from "react";
import { cubeReducer, CubeResetAction, CubeRotateAction, CubeState } from "./cube.reducer";
import Button from "../ui/Button";
import Facet from "./Facet";
import { FacetId, RotationDirection } from "./cube.constants";

export default function Cube() {

  const [state, dispatch] = useReducer(cubeReducer, CubeState.default());

  const rotate = (facetId: string, direction: string) => {
    dispatch(new CubeRotateAction(facetId, direction));
  }
  const reset = () => {
    dispatch(new CubeResetAction());
  }

  const { facets } = state;
  const { Front, Right, Back, Left, Up, Down} = FacetId;
  const { Clockwise, CounterClockwise } = RotationDirection;

  return (
    <div>
      <div className="grid grid-cols-4 m-8 p-4 border border-gray-900">
        <div>{/* grid-placeholder */}</div> 
        <Facet facetColors={facets[Up]} /> 
        <div>{/* grid-placeholder */}</div>
        <div>{/* grid-placeholder */}</div>
        <Facet facetColors={facets[Left]} /> 
        <Facet facetColors={facets[Front]} /> 
        <Facet facetColors={facets[Right]} /> 
        <Facet facetColors={facets[Back]} />
        <div>{/* grid-placeholder */}</div> 
        <Facet facetColors={facets[Down]} /> 
        <div>{/* grid-placeholder */}</div>
        <div>{/* grid-placeholder */}</div>
      </div>
      <div className="text-center uppercase tracking-widest text-gray-500 mb-2">
        Operations
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-2 justify-center mb-4">
        {[Front, Right, Up, Back, Left, Down].map((facet) =>
          <Fragment key={facet}>
            <Button onClick={() => rotate(facet, Clockwise)}>{facet}</Button>  
            <Button onClick={() => rotate(facet, CounterClockwise)}>{facet}&apos;</Button>
          </Fragment>
        )}
      </div>
      <div className="grid justify-center">
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
