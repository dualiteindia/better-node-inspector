import Github from "../public/assests/GitHub.png";

interface NavbarProps {
  selectionName: string;
}

export default function Navbar({ selectionName }: NavbarProps) {
  return (
    <div className="flex justify-between">
      <div className="font-semibold">
        {selectionName ? `${selectionName} Selected` : "Nothing Selected"}
      </div>

      <img src={Github} alt="GithubLogo" className="h-[30px]" />
    </div>
  );
}
