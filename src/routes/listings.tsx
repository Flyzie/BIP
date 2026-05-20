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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import mockOffersData from "@/lib/offers.json"
import { type Offer } from "@/lib/offers"

function MapsLocation(address: any, uni: any) {
  let string = "https://maps.google.com/?q="
  string += (address ? address + "+" : "")
  string += uni
  window.open(string.replace(" ", "+"))
}

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
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">
          ⭐ Minimum Rating: {minRating}+
        </h4>

        <Slider
          min={0}
          max={5}
          step={0.5}
          value={[minRating]}
          onValueChange={(val) => setMinRating(val[0])}
        />
      </div>

      <Button
        onClick={clearAllFilters}
        variant="outline"
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  )
}

function ListingsComponent() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("bip_offers")

    if (saved) {
      setOffers(JSON.parse(saved))
    } else {
      setOffers(mockOffersData as Offer[])
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedModes, setSelectedModes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [minRating, setMinRating] = useState(0)
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
        selectedCategory === "all" ||
        offer.category === selectedCategory

      const matchesMode =
        selectedModes.length === 0 ||
        selectedModes.includes(offer.mode)

      const matchesPrice =
        offer.price >= priceRange[0] &&
        offer.price <= priceRange[1]

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

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "tutoring":
        return "📚"
      case "graphics":
        return "🎨"
      case "presentations":
        return "📊"
      default:
        return "✨"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex flex-1">

        {/* Desktop Sidebar */}
        <aside className="fixed top-16 bottom-0 left-0 hidden w-80 overflow-y-auto border-r bg-background/30 p-6 backdrop-blur-md lg:block">
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:ml-80">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <h1 className="text-3xl font-bold">
                  Active Offers
                </h1>

                <p className="text-sm text-muted-foreground">
                  {filteredOffers.length} offers found
                </p>
              </div>

              {/* Mobile Filter */}
              <Sheet
                open={isMobileFilterOpen}
                onOpenChange={setIsMobileFilterOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden"
                  >
                    Filters
                  </Button>
                </SheetTrigger>

                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6">
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
                </SheetContent>
              </Sheet>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredOffers.map((offer) => (
                <Card
                  key={offer.id}
                  className="group overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-black/20"
                >

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">

                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
                        {getCategoryEmoji(offer.category)} {offer.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                      €{offer.price}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {offer.title}
                    </CardTitle>

                    <div className="flex items-center gap-2 text-sm">
                      <span>⭐ {offer.rating}</span>

                      <span className="text-muted-foreground">
                        ({offer.reviewCount} reviews)
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">

                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {offer.description}
                    </p>

                    <div>
                      <p className="font-medium">
                        {offer.sellerName}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {offer.sellerUniversity}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">

                      <span className="rounded-full bg-muted px-3 py-1 text-xs">
                        {offer.mode}
                      </span>

                      {offer.location && (
                        <span className="rounded-full bg-muted px-3 py-1 text-xs">
                          📍 {offer.location.city}
                        </span>
                      )}
                      
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2">

                    <Button
                      className="flex-1"
                      onClick={() => setSelectedOffer(offer)}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        navigate({
                          to: "/createOffer",
                          search: { editId: offer.id },
                        })
                      }}
                    >
                      Edit
                    </Button>

                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* RESPONSIVE DETAIL DIALOG - FULLY OPTIMIZED FOR MOBILE */}
      <Dialog
        open={!!selectedOffer}
        onOpenChange={() => setSelectedOffer(null)}
      >
        <DialogContent 
          className="!max-w-none w-[95vw] h-[90vh] md:w-[98vw] md:h-[95vh] p-0 border border-white/10 bg-background/95 backdrop-blur-2xl overflow-hidden rounded-lg md:rounded-xl"
          style={{ maxWidth: '95vw', maxHeight: '90vh' }}
        >
          {selectedOffer && (
            <div className="flex flex-col h-full overflow-hidden">
              
              {/* Mobile Header with Image Preview */}
              <div className="relative lg:hidden">
                <img
                  src={selectedOffer.imageUrl}
                  alt={selectedOffer.title}
                  className="h-56 w-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
                    {getCategoryEmoji(selectedOffer.category)} {selectedOffer.category}
                  </span>
                  
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs text-white">
                    {selectedOffer.status}
                  </span>
                </div>
                
                <div className="absolute right-4 bottom-4 rounded-xl bg-primary px-4 py-2 text-xl font-bold text-primary-foreground shadow-lg">
                  €{selectedOffer.price}
                </div>
                
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white backdrop-blur-md"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Desktop Image - Hidden on Mobile */}
              <div className="hidden lg:block lg:absolute lg:inset-0 lg:w-1/2">
                <img
                  src={selectedOffer.imageUrl}
                  alt={selectedOffer.title}
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/60 px-4 py-1.5 text-sm text-white backdrop-blur-md">
                    {getCategoryEmoji(selectedOffer.category)} {selectedOffer.category}
                  </span>
                  
                  <span className="rounded-full bg-emerald-500/90 px-4 py-1.5 text-sm text-white">
                    {selectedOffer.status}
                  </span>
                </div>
                
                <div className="absolute right-5 bottom-5 rounded-2xl bg-primary px-6 py-3 text-3xl font-bold text-primary-foreground shadow-2xl">
                  €{selectedOffer.price}
                </div>
              </div>
              
              {/* Scrollable Content Area - Mobile Optimized */}
              <div className="flex-1 overflow-y-scroll p-4 md:p-6 lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:p-8">
                
                {/* Title & Description */}
                <div className="space-y-3 lg:space-y-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                    {selectedOffer.title}
                  </h2>
                  
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {selectedOffer.description}
                  </p>
                </div>
                
                {/* Seller Info */}
                <div className="mt-6 rounded-xl border bg-muted/30 p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold">
                        {selectedOffer.sellerName}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {selectedOffer.sellerUniversity}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-base md:text-lg font-bold">
                        ⭐ {selectedOffer.rating}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {selectedOffer.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3 md:gap-4">
                  <div className="rounded-xl border bg-muted/20 p-3 md:p-4">
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Completed
                    </div>
                    <div className="mt-1 text-lg md:text-2xl font-bold">
                      {selectedOffer.totalCompleted}
                    </div>
                  </div>
                  
                  <div className="rounded-xl border bg-muted/20 p-3 md:p-4">
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Mode (In Person/Online)
                    </div>
                    <div className="mt-1 text-base md:text-xl font-bold capitalize">
                      {selectedOffer.mode.replace("_", " ")}
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                {selectedOffer.location && (
                  <div className="mt-4 md:mt-6 rounded-xl border bg-muted/20 p-4 md:p-5">
                    <h3 className="mb-2 md:mb-3 text-base md:text-lg font-semibold">
                      📍 Location
                    </h3>
                    <p className="text-sm md:text-base font-medium">
                      {selectedOffer.location.city}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {selectedOffer.location.address}
                    </p>
                    
                    <Button 
                      size="sm" 
                      className="mt-3 w-full sm:w-auto"
                      onClick={() => MapsLocation(selectedOffer.location?.address, selectedOffer.sellerUniversity)}
                    >
                      Open in Google Maps
                    </Button>
                  </div>
                )}
                
                {/* Available Slots */}
                <div className="mt-4 md:mt-6 rounded-xl border bg-muted/20 p-4 md:p-5">
                  <div className="mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-base md:text-lg font-semibold">
                      📅 Available Slots
                    </h3>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {selectedOffer.slots.length} sessions
                    </span>
                  </div>
                  
                  <div className="space-y-2 max-h-[200px] md:max-h-[280px] overflow-y-auto pr-1">
                    {selectedOffer.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border bg-background/50 p-3 md:p-4"
                      >
                        <div>
                          <p className="text-sm md:text-base font-medium">
                            {new Date(slot.startTime).toLocaleDateString()}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {new Date(slot.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {" - "}
                            {new Date(slot.endTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        
                        <span
                          className={`rounded-full px-2 md:px-3 py-1 text-xs font-medium w-fit ${
                            slot.isBooked
                              ? "bg-red-500/10 text-red-500"
                              : "bg-emerald-500/10 text-emerald-500"
                          }`}
                        >
                          {slot.isBooked ? "Booked" : "Available"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 md:mt-8 flex flex-col gap-2 md:gap-3 border-t pt-4 md:pt-6 sm:flex-row">
                  <Button size="default" className="flex-1">
                    Contact Seller
                  </Button>
                  <Button size="default" variant="outline" className="flex-1">
                    Save Offer
                  </Button>
                </div>
                
                {/* Creation Date */}
                <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-muted-foreground pb-2">
                  Created {new Date(selectedOffer.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ListingsComponent