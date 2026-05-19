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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// eslint-disable-next-line react-refresh/only-export-components
export const Route = createRootRoute({
  component: RootComponent,
})

export default function RootComponent() {
  const [open, setOpen] = React.useState(false)
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  // Sprawdź zapisany motyw lub preferencje systemowe
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo + nazwa - przyklejone do lewej krawędzi */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img
              src="/src/assets/new-logo.png"
              alt="Swaply Logo"
              className="h-8 w-8 rounded-lg object-cover md:h-10 md:w-10"
            />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-lg font-bold text-transparent md:text-xl">
              UniLance
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex md:gap-6 md:text-sm md:font-medium lg:gap-8">
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

          {/* Right side icons - theme toggle + bell + avatar + mobile menu button */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full hover:bg-muted md:h-9 md:w-9"
            >
              {isDarkMode ? (
                <span className="text-lg md:text-xl">☀️</span>
              ) : (
                <span className="text-lg md:text-xl">🌙</span>
              )}
            </Button>

            {/* Notifications dropdown */}
            <DropdownMenu
              open={notificationsOpen}
              onOpenChange={setNotificationsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full hover:bg-muted md:h-9 md:w-9"
                >
                  <span className="text-lg md:text-xl">🔔</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-72 md:w-80"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="py-6 text-center text-sm text-muted-foreground">
                  🔔 No new notifications
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setNotificationsOpen(false)}
                  className="cursor-pointer justify-center text-center text-xs text-muted-foreground"
                >
                  Mark all as read
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile dropdown */}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full p-0 hover:bg-muted md:h-9 md:w-9"
                >
                  <Avatar className="h-8 w-8 cursor-pointer md:h-9 md:w-9">
                    <AvatarImage
                      src="/src/assets/profile.png"
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-primary/10 text-xs text-primary md:text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                  <Link to="/login" className="cursor-pointer">
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

            {/* Mobile Menu Button - visible only on mobile */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 md:hidden"
                >
                  <span className="text-xl">☰</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    activeProps={{
                      className: "text-primary font-semibold",
                    }}
                    activeOptions={{ exact: true }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-colors hover:bg-muted"
                  >
                    🏠 Home
                  </Link>
                  <Link
                    to="/listings"
                    onClick={() => setMobileMenuOpen(false)}
                    activeProps={{
                      className: "text-primary font-semibold",
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-colors hover:bg-muted"
                  >
                    📋 Browse Offers
                  </Link>
                  <Link
                    to="/createOffer"
                    search={{ editId: undefined }}
                    onClick={() => setMobileMenuOpen(false)}
                    activeProps={{
                      className: "text-primary font-semibold",
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-colors hover:bg-muted"
                  >
                    ✨ Create Offer
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
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
