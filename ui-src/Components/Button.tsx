import "../Utils/global.css";

interface ButtonProps {
  btnText: string;
  onClick: () => void;
}

const Button = ({ btnText, onClick }: ButtonProps) => {
  return (
    <button
      className={`w-[130px] h-[30px] bg-secondary text-[10px] font-textFont font-bold rounded-sm cursor-pointer text-white hover:bg-[#C9D2FF] hover:text-secondary drop-shadow-glowMedium`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};
export default Button;
