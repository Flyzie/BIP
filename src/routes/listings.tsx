import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import mockOffersData from "@/lib/offers.json"
import { type Offer } from "@/lib/offers"

export const Route = createFileRoute("/listings")({
  component: ListingsComponent,
})

interface FilterContentProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedModes: string[]
  setSelectedModes: (value: string[]) => void
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  selectedUniversity: string
  setSelectedUniversity: (value: string) => void
  minRating: number
  setMinRating: (value: number) => void
  universities: string[]
  clearAllFilters: () => void
}

function FilterContent({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedModes,
  setSelectedModes,
  priceRange,
  setPriceRange,
  selectedUniversity,
  setSelectedUniversity,
  minRating,
  setMinRating,
  universities,
  clearAllFilters,
}: FilterContentProps) {
  const modes = [
    { value: "online", label: "Online" },
    { value: "in_person", label: "In Person" },
    { value: "both", label: "Both" },
  ]

  const toggleMode = (modeValue: string) => {
    if (selectedModes.includes(modeValue)) {
      setSelectedModes(selectedModes.filter((m) => m !== modeValue))
    } else {
      setSelectedModes([...selectedModes, modeValue])
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">🔍 Search</h4>
        <Input
          placeholder="Search offers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">🏛️ University</h4>
        <Select
          value={selectedUniversity}
          onValueChange={setSelectedUniversity}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Universities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Universities</SelectItem>
            {universities.map((uni) => (
              <SelectItem key={uni} value={uni}>
                {uni}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">📂 Category</h4>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="tutoring">📚 Tutoring</SelectItem>
            <SelectItem value="graphics">🎨 Graphics</SelectItem>
            <SelectItem value="presentations">📊 Presentations</SelectItem>
            <SelectItem value="other">✨ Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Mode</h4>
        <div className="flex flex-wrap gap-2">
          {modes.map((mode) => (
            <Button
              key={mode.value}
              type="button"
              variant={
                selectedModes.includes(mode.value) ? "default" : "outline"
              }
              size="sm"
              onClick={() => toggleMode(mode.value)}
              className="rounded-full"
            >
              {mode.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">
          💰 Price Range: €{priceRange[0]} - €{priceRange[1]}
        </h4>
        <Slider
          min={0}
          max={200}
          step={5}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">⭐ Minimum Rating: {minRating}+ ⭐</h4>
        <Slider
          min={0}
          max={5}
          step={0.5}
          value={[minRating]}
          onValueChange={(val) => setMinRating(val[0])}
          className="w-full"
        />
      </div>

      <Button onClick={clearAllFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  )
}

function MockPagination() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2 border-t pt-4">
      <Button variant="outline" size="sm" disabled>
        Previous
      </Button>
      <Button variant="default" size="sm" className="h-8 w-8 p-0">
        1
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        2
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        3
      </Button>
      <span className="text-sm text-muted-foreground">...</span>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        8
      </Button>
      <Button variant="outline" size="sm">
        Next
      </Button>
    </div>
  )
}

function ListingsComponent() {
  const [offers, setOffers] = useState<Offer[]>([])
  const navigate = useNavigate()

  // Load offers from localStorage or mock data
  useEffect(() => {
    const saved = localStorage.getItem("bip_offers")
    if (saved) {
      const parsed = JSON.parse(saved)
      console.log("Loaded from localStorage:", parsed.length, "offers")
      setOffers(parsed)
    } else {
      console.log(
        "Loading from mock data:",
        (mockOffersData as Offer[]).length,
        "offers"
      )
      setOffers(mockOffersData as Offer[])
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedModes, setSelectedModes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 200])
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all")
  const [minRating, setMinRating] = useState<number>(0)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const universities = useMemo(() => {
    const unis = new Set(offers.map((offer) => offer.sellerUniversity))
    return Array.from(unis).sort()
  }, [offers])

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        searchTerm === "" ||
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || offer.category === selectedCategory
      const matchesMode =
        selectedModes.length === 0 || selectedModes.includes(offer.mode)
      const matchesPrice =
        offer.price >= priceRange[0] && offer.price <= priceRange[1]
      const matchesUniversity =
        selectedUniversity === "all" ||
        offer.sellerUniversity === selectedUniversity
      const matchesRating = offer.rating >= minRating

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMode &&
        matchesPrice &&
        matchesUniversity &&
        matchesRating
      )
    })
  }, [
    offers,
    searchTerm,
    selectedCategory,
    selectedModes,
    priceRange,
    selectedUniversity,
    minRating,
  ])

  const clearAllFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedModes([])
    setPriceRange([0, 200])
    setSelectedUniversity("all")
    setMinRating(0)
  }, [])

  console.log("Total offers:", offers.length)
  console.log("Filtered offers:", filteredOffers.length)

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "tutoring":
        return "📚"
      case "graphics":
        return "🎨"
      case "presentations":
        return "📊"
      default:
        return "🤝"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex flex-1">
        {/* Desktop Sidebar - Fixed to left edge, below top bar */}
        <aside className="fixed top-16 bottom-0 left-0 hidden w-80 shrink-0 overflow-y-auto border-r bg-background/30 p-6 backdrop-blur-md lg:block">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
            </div>
            <FilterContent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedModes={selectedModes}
              setSelectedModes={setSelectedModes}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedUniversity={selectedUniversity}
              setSelectedUniversity={setSelectedUniversity}
              minRating={minRating}
              setMinRating={setMinRating}
              universities={universities}
              clearAllFilters={clearAllFilters}
            />
          </div>
        </aside>

        {/* Main Content - With left margin to account for fixed sidebar */}
        <main className="flex-1 p-4 md:p-6 lg:ml-80">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Active Offers
                </h1>
              </div>

              {/* Mobile Filter Button */}
              <Sheet
                open={isMobileFilterOpen}
                onOpenChange={setIsMobileFilterOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <span className="mr-2">🔍</span>
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] overflow-y-auto sm:w-[350px]"
                >
                  <SheetHeader className="mb-4">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedModes={selectedModes}
                    setSelectedModes={setSelectedModes}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedUniversity={selectedUniversity}
                    setSelectedUniversity={setSelectedUniversity}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    universities={universities}
                    clearAllFilters={clearAllFilters}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              Found {filteredOffers.length} offer
              {filteredOffers.length !== 1 ? "s" : ""}
            </p>

            {filteredOffers.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg">No offers found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredOffers.map((offer) => (
                    <Card
                      key={offer.id}
                      className="group relative flex flex-col overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-black/20"
                    >
                      {/* Glass overlay effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Image with overlay badges */}
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img
                          src={offer.imageUrl}
                          alt={offer.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement>
                          ) => {
                            e.currentTarget.src =
                              "https://placehold.co/800x600?text=📷+No+Image"
                          }}
                        />
                        {/* Category badge - top left */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {getCategoryEmoji(offer.category)} {offer.category}
                          </span>
                        </div>
                        {/* Price badge - top right */}
                        <div className="absolute top-3 right-3">
                          <span className="rounded-full bg-primary/90 px-3 py-1 text-sm font-bold text-primary-foreground shadow-lg backdrop-blur-sm">
                            €{offer.price}
                          </span>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="line-clamp-1 text-xl transition-colors group-hover:text-primary">
                          {offer.title}
                        </CardTitle>
                        {/* Rating row */}
                        <div className="mt-1 flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">
                            {offer.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({offer.reviewCount} reviews)
                          </span>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            👥 {offer.totalCompleted} students
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 space-y-3 pb-2">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {offer.description}
                        </p>

                        {/* Seller info */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {offer.sellerName}
                            </p>
                            <div className="flex items-center gap-1">
                              <p className="text-xs text-muted-foreground">
                                {offer.sellerUniversity}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mode chips */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="inline-flex items-center rounded-full bg-muted/50 px-2.5 py-0.5 text-xs backdrop-blur-sm">
                            {offer.mode === "online"
                              ? "🌐 Online"
                              : offer.mode === "in_person"
                                ? "📍 In Person"
                                : "🌐📍 Both"}
                          </span>
                          {offer.location && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2.5 py-0.5 text-xs backdrop-blur-sm">
                              📍 {offer.location.city}
                            </span>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2 border-t border-white/10 pt-4">
                        <Button
                          className="flex-1 bg-primary/80 backdrop-blur-sm hover:bg-primary"
                          size="sm"
                          onClick={() => {
                            console.log("View details", offer.id)
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={() => {
                            navigate({
                              to: "/createOffer",
                              search: { editId: offer.id },
                            })
                          }}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                        >
                          ✏️ Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <MockPagination />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
