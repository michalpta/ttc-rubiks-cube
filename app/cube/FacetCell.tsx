export default function FacetCell({ color }: { color: string }) {
  return (
    <div 
      className="flex justify-center items-center m-1 w-8 h-8 text-black rounded" 
      style={{ backgroundColor: color }}>
    </div>
  );
}
