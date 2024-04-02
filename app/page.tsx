"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const Router = useRouter();

  useEffect(() => {
    Router.push("/signup");
  }, []);

  return <></>;
};

export default App;
