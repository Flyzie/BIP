import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// eslint-disable-next-line react-refresh/only-export-components
export const Route = createRootRoute({
  component: RootComponent,
})

export default function RootComponent() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo + nazwa - przyklejone do lewej krawędzi */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img
              src="/src/assets/logo.png"
              alt="Swaply Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-bold text-transparent">
              Swaply
            </span>
          </Link>

          {/* Nawigacja - wyśrodkowana */}
          <div className="flex gap-8 text-sm font-medium">
            <Link
              to="/"
              activeProps={{
                className: "text-primary font-semibold",
              }}
              activeOptions={{ exact: true }}
              className="transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/listings"
              activeProps={{
                className: "text-primary font-semibold",
              }}
              className="transition-colors hover:text-primary"
            >
              Browse Offers
            </Link>
            <Link
              to="/createOffer"
              search={{ editId: undefined }}
              activeProps={{
                className: "text-primary font-semibold",
              }}
              className="transition-colors hover:text-primary"
            >
              Create Offer
            </Link>
          </div>

          {/* Avatar - przyklejony do prawej krawędzi */}
          <div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 hover:bg-muted"
                >
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage
                      src="/src/assets/profile.png"
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                  <Link to="/" className="cursor-pointer">
                    👤 Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                  <Link to="/" className="cursor-pointer">
                    📋 My Offers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                  <Link to="/" className="cursor-pointer">
                    📅 My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                  <Link to="/" className="cursor-pointer">
                    💰 Earnings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setOpen(false)}
                  className="cursor-pointer text-destructive"
                >
                  🚪 Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Padding top aby treść nie chowała się pod fixed navbar */}
      <div className="pt-16">
        <Outlet />
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
