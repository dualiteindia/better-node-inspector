import { Button } from "./Button";

import shineIcon from "../public/assests/shineIcon.png";

export default function Footer() {
  return (
    <div className="w-full">
      <hr className="border-strokeBlue border-1 shadow-md" />
      <div className="flex justify-around py-2 items-center">
        <div className="text-[0.65rem] font-semibold">
          Convert your designs to code
        </div>
        <Button
          onClick={() => window.open("https://bit.ly/3TU6hiy")}
          icon={shineIcon}
        >
          Try Dualite Now
        </Button>
      </div>
    </div>
  );
}
