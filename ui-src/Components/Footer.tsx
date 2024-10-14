import { Button } from "./Button";
import ShineIcon from "../shineIcon.svg";

export default function Footer() {
  return (
    <div className="w-full">
      <hr className="border-strokeBlue border-1 shadow-md" />
      <div className="fl</svg>ex justify-around pt-1 pb-1 items-center">
        <div className="text-[0.65rem] font-semibold">
          Convert your designs to code with Dualite
        </div>
        <Button>Visit</Button>
      </div>
    </div>
  );
}
