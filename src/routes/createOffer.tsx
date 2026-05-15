import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { type TimeSlot, type Offer } from "@/lib/offers"
import mockOffersData from "@/lib/offers.json"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const Route = createFileRoute("/createOffer")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      editId: (search.editId as string) || undefined,
    }
  },
  component: CreateOffer,
})

const getOffers = (): Offer[] => {
  const saved = localStorage.getItem("bip_offers")
  if (saved) return JSON.parse(saved)
  return mockOffersData as Offer[]
}

const saveOffers = (offers: Offer[]) => {
  localStorage.setItem("bip_offers", JSON.stringify(offers))
}

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .or(z.literal("")),
  category: z.enum(["tutoring", "graphics", "presentations", "other"]),
  price: z.coerce.number().min(0),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  mode: z.enum(["online", "in_person", "both"]),
  location: z.object({
    address: z.string(),
    city: z.string(),
  }),
  slots: z.array(z.custom<TimeSlot>()),
  status: z.enum(["active", "hidden", "blocked"]),
})

// eslint-disable-next-line react-refresh/only-export-components
function CreateOffer() {
  const { editId } = Route.useSearch()
  const [isEditing] = useState(!!editId)

  const navigate = useNavigate()

  function onSubmit(data: z.infer<typeof schema>) {
    const currentOffers = getOffers()

    if (editId) {
      const updatedOffers = currentOffers.map((o) =>
        o.id === editId
          ? {
              ...o,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
      saveOffers(updatedOffers)
    } else {
      const newOffer: Offer = {
        id: (currentOffers.length > 0
          ? Math.max(...currentOffers.map((o) => parseInt(o.id))) + 1
          : 1
        ).toString(),
        sellerName: "Martin",
        sellerUniversity: "Harvard",
        rating: 0,
        reviewCount: 0,
        totalCompleted: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      }
      const updatedOffers = [...currentOffers, newOffer]
      saveOffers(updatedOffers)
    }

    navigate({ to: "/listings" })
  }

  const form = useForm<z.infer<typeof schema>>({
    //@ts-expect-error<React hook form is bitching with zod>
    resolver: zodResolver(schema),
    defaultValues: async () => {
      if (editId) {
        const offer = getOffers().find((o) => o.id === editId)
        if (offer) {
          return {
            title: offer.title,
            description: offer.description,
            category: offer.category,
            price: offer.price,
            imageUrl: offer.imageUrl || "",
            mode: offer.mode,
            location: offer.location || { address: "", city: "" },
            slots: offer.slots,
            status: offer.status,
          }
        }
      }
      return {
        title: "",
        description: "",
        category: "other",
        price: 0,
        imageUrl: "",
        mode: "both",
        location: { address: "", city: "" },
        slots: [],
        status: "hidden",
      }
    },
  })

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit offer" : "Create new offer"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="form-main"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-main-title">Offer Title</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Math Tutoring for High School"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-main-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-main-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Tell us more about your offer..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-main-category">
                      Category
                    </FieldLabel>
                    <select
                      {...field}
                      id="form-main-category"
                      className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                    >
                      <option value="tutoring">Tutoring</option>
                      <option value="graphics">Graphics</option>
                      <option value="presentations">Presentations</option>
                      <option value="other">Other</option>
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-main-price">Price</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      id="form-main-price"
                      aria-invalid={fieldState.invalid}
                      placeholder="0.00"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="imageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-main-image">Image URL</FieldLabel>
                  <Input
                    {...field}
                    id="form-main-image"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com/image.jpg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="mode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-main-mode">Service Mode</FieldLabel>
                  <select
                    {...field}
                    id="form-main-mode"
                    className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                  >
                    <option value="online">Online</option>
                    <option value="in_person">In Person</option>
                    <option value="both">Both</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="location.city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-main-city">City</FieldLabel>
                    <Input
                      {...field}
                      id="form-main-city"
                      aria-invalid={fieldState.invalid}
                      placeholder="City"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="location.address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-main-address">Address</FieldLabel>
                    <Input
                      {...field}
                      id="form-main-address"
                      aria-invalid={fieldState.invalid}
                      placeholder="Street address"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-main-status">
                    Initial Status
                  </FieldLabel>
                  <select
                    {...field}
                    id="form-main-status"
                    className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                  >
                    <option value="active">Active</option>
                    <option value="hidden">Hidden</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" form="form-main" className="w-full">
            {editId ? "Confirm edit" : "Create offer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
