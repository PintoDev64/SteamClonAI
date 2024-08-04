import { Analytics } from "@vercel/analytics/react"
import { RouterProvider } from "react-router-dom";

// Router
import RouterStructure from "router";

export default function App() {

  return (
    <>
      <Analytics />
      <RouterProvider router={RouterStructure} />
    </>
  )
}