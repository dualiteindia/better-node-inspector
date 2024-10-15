import Github from "../public/assests/GitHub.png";

interface NavbarProps {
  selectionName: string;
}

export default function Navbar({ selectionName }: NavbarProps) {
  const truncatedSelectionName =
    selectionName?.length > 30
      ? selectionName.slice(0, 20) + "..."
      : selectionName;
  return (
    <div className="flex justify-between">
      <div className="font-semibold">
        {selectionName
          ? `${truncatedSelectionName} Selected`
          : "Nothing Selected"}
      </div>
      <div
        onClick={() =>
          window.open("https://github.com/dualiteindia/better-node-inspector")
        }
      >
        <img
          src={Github}
          alt="GithubLogo"
          className=" cursor-pointer h-[30px]"
        />
      </div>
    </div>
  );
}
