import { Button } from "./Button";

import shineIcon from "../shineIcon.png";

export default function Footer() {
  return (
    <div className="w-full">
      <hr className="border-strokeBlue border-1 shadow-md" />
      <div className="flex justify-around py-2 items-center">
        <div className="text-[0.65rem] font-semibold">
          Convert your designs to code with Dualite
        </div>
        <Button icon={shineIcon}>Visit</Button>
      </div>
    </div>
  );
}
