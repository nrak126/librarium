import LoadingBrown from "@/src/components/LoadingBrown";
import { PageClient } from "./components/PageClient";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <LoadingBrown />
          </div>
        }
      >
        <PageClient />
      </Suspense>
    </>
  );
}
