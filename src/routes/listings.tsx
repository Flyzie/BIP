import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { type Offer } from "@/lib/offers"
import mockOffersData from "@/lib/offers.json"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/listings")({
  component: ListingsComponent,
})

//CREATE THE LISTINGS PAGE HERE AFTER LOGIN

// eslint-disable-next-line react-refresh/only-export-components
function ListingsComponent() {
  const [offers, setOffers] = useState<Offer[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("bip_offers")
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOffers(JSON.parse(saved))
    } else {
      setOffers(mockOffersData as Offer[])
    }
  }, [])

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Active Offers</h1>
          <p className="text-muted-foreground">
            Browse all available service offers from students.
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.length === 0 ? (
          <p className="col-span-full py-10 text-center text-muted-foreground">
            No offers available. Try creating one!
          </p>
        ) : (
          offers.map((offer) => (
            <Card key={offer.id} className="flex flex-col">
              {offer.imageUrl && (
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="aspect-video w-full object-cover"
                />
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{offer.title}</CardTitle>
                  <span className="text-lg font-bold text-primary">
                    ${offer.price}
                  </span>
                </div>
                <CardDescription className="flex items-center gap-2 capitalize">
                  <span>{offer.category}</span>
                  <span>•</span>
                  <span>{offer.mode}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-muted-foreground">
                  {offer.description}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                  <span>{offer.sellerName}</span>
                  <span>{offer.sellerUniversity}</span>
                </div>
                <Button className="w-full" size="sm">
                  View Details
                </Button>
                <Button
                  onClick={() => {
                    navigate({
                      to: "/createOffer",
                      search: { editId: offer.id },
                    })
                  }}
                  className="w-full bg-sidebar-ring"
                  size="sm"
                >
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
