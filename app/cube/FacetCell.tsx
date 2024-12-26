export default function FacetCell({ color }: { color: string }) {
  return (
    <div 
      className="flex justify-center items-center w-6 h-6 text-black rounded" 
      style={{ backgroundColor: color }}>
    </div>
  );
}
