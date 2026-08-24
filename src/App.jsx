import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";

const About = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./pages/About")), 700);
    }),
);

function AboutLoader() {
  return <div className="container py-5 text-center">Loading...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<AboutLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
