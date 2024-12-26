export default function FacetCell({ color }: { color: string }) {
  return (
    <div 
      className="flex justify-center items-center m-px w-4 h-4 text-black rounded" 
      style={{ backgroundColor: color }}>
    </div>
  );
}
