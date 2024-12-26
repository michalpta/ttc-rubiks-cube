import { EventHandler, PropsWithChildren } from "react";

export default function Button({ onClick, children }: PropsWithChildren<{ onClick: EventHandler<React.MouseEvent> }>) {
  return (
    <button 
      className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors font-bold" 
      onClick={onClick}>
        {children}
    </button>
  );
}
