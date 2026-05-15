export interface Offer {
  id: string
  sellerName: string
  sellerUniversity: string
  title: string
  description: string
  category: "tutoring" | "graphics" | "presentations" | "other"
  price: number
  imageUrl?: string
  mode: "online" | "in_person" | "both"
  location?: Location
  slots: TimeSlot[]
  status: "active" | "hidden" | "blocked"
  rating: number
  reviewCount: number
  totalCompleted: number
  createdAt: string
  updatedAt: string
  moderationNote?: string
}

export interface TimeSlot {
  id: string
  startTime: Date
  endTime: Date
  isBooked: boolean
}

export interface Location {
  address: string
  city: string
}
