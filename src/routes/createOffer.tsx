import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/createOffer")({
  component: CreateOffer,
})

// eslint-disable-next-line react-refresh/only-export-components
function CreateOffer() {
  return <div>Hello "/createListing"!</div>
}
