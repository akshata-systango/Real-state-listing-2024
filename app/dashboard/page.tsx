import HeaderBar from "../higherOrder/mainLayout";

const dashboard = () => {
  return (
    <>
      <HeaderBar>
        <p>
          The way we use useEffect in the example is to register and unregister
          the listeners on mount/unmount. But you could also just register on
          mount and ignore any other rendering event, to do so you would do
          this:
        </p>
      </HeaderBar>
    </>
  );
};
export default dashboard;
