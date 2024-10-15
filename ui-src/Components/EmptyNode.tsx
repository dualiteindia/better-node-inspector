import block from "../public/assests/block.png";

export default function EmptyNode() {
  return (
    <div className="text-center">
      <img src={block} alt="blockImg" className="h-[30px] mx-auto mb-2" />
      <h2 className="font-bold mb-1 ">Select a Node</h2>
      <p className="text-xs ">Select a Figma Node to view it's properties</p>
    </div>
  );
}
