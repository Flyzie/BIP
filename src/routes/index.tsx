import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomeComponent,
})

//CREATE THE LOGIN PAGE HERE
// eslint-disable-next-line react-refresh/only-export-components
function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
