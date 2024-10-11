import Logo from "../Logo";
import Button from "../Components/Button";
import { increment } from "../redux/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function Rectangle() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const onCreate = (count: number) => {
    parent.postMessage({ pluginMessage: { type: "create-rectangles", count } }, "*");
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <main className="d-flex items-center flex-col justify-center">
        <header>
          <Logo />
          <h2>Rectangle Creator</h2>
        </header>
        <section className="d-flex items-center flex-col justify-center mb-4   ">
          <span>{count}</span>
          <Button btnText="Increment" onClick={() => dispatch(increment())} />
        </section>
        <footer>
          <button type="submit" onClick={() => onCreate(count)}>
            Create
          </button>
          <button onClick={onCancel}>Close Plugin</button>
        </footer>
      </main>
    </div>
  );
}

export default Rectangle;
