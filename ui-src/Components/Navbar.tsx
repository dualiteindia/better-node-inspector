interface NavbarProps {
  selectionName: string;
  // github: string;
}

export default function Navbar({ selectionName }: NavbarProps) {
  return (
    <div className="flex justify-between">
      <div className="font-semibold">
        {selectionName ? `${selectionName} Selected` : "Nothing Selected"}
      </div>
      <div className="rounded-xl border">Git</div>
    </div>
  );
}
