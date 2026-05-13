import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"

export const Route = createFileRoute("/listings")({
  component: ListingsComponent,
})

//CREATE THE LISTINGS PAGE HERE AFTER LOGIN

// eslint-disable-next-line react-refresh/only-export-components
function ListingsComponent() {
  return (
    <div className="p-2">
      <h3>Listings</h3>
    </div>
  )
}
