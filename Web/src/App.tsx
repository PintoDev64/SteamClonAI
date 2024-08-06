import { Analytics } from "@vercel/analytics/react"
import ModalProvider from "context/Modal";
import PageTransitionProvider from "context/PageTransition";
import { RouterProvider } from "react-router-dom";

// Router
import RouterStructure from "router";

export default function App() {

  return (
    <ModalProvider>
      <PageTransitionProvider>
        <Analytics />
        <RouterProvider router={RouterStructure} />
      </PageTransitionProvider>
    </ModalProvider>
  )
}