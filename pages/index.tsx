import Cube from "../app/cube/Cube";

export default function Home() {
  return (
    <div className="p-10">
      <div className="text-center">
        <h1 className="text-2xl">TTC Rubik Challenge</h1>
        <h2 className="text-gray-500">Michal Ptaszek</h2>
      </div>
      <div className="flex justify-center">

        <Cube />
      
      </div>
    </div>
  );
}
