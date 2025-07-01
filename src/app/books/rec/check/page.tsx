import { Suspense } from "react";
import { ShowRec } from "./components/showRe";

export default function Page() {
  return (
    <>
      <Suspense>
        <ShowRec />
      </Suspense>
    </>
  );
}
