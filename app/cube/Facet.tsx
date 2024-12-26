import FacetCell from "./FacetCell";

export default function Facet({ facetColors }: { facetColors: string[][] }) {
  return (
    <div className="grid grid-cols-3 m-1">
      {facetColors[0].map((color, index) => 
        <FacetCell key={'0' + index} color={color} />
      )}
      {facetColors[1].map((color, index) => 
        <FacetCell key={'1' + index} color={color} />
      )}
      {facetColors[2].map((color, index) => 
        <FacetCell key={'2' + index} color={color} />
      )}
    </div>
  );
}
