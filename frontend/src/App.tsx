import Bundler from "./features/builder/sections";
import ReviewPanel from "./features/review/sections";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <header className="sm:hidden pt-8 text-center pb-4">
        <h1 className="font-bold text-3xl">Let's get started!</h1>
      </header>
      <main className="sm:max-w-4xl md:max-w-7xl flex flex-col xl:flex-row md:px-6 xl:px-0 mx-auto justify-between md:gap-8.5 xl:gap-0 md:my-12">
        <Bundler />
        <ReviewPanel />
      </main>
      <Toaster />
    </>
  );
}

export default App;
