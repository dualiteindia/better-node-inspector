import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex h-full w-full justify-center items-center">
      <img
        src={
          "https://69sfgmk1pv2omedb.public.blob.vercel-storage.com/assets/splash-plugin-zRfnbPAF7auZbJIQt5oZGoKKlZzs5H.gif"
        }
        style={{
          width: "100%",
        }}
        alt="splash"
      />
    </div>
  );
};

export default Splash;
