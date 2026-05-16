import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import * as React from "react"

export const Route = createFileRoute("/")({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}

            <div className="mb-6 inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm backdrop-blur-sm">
              <span className="mr-1">🚀</span>
              <span>Connect • Learn • Earn</span>
            </div>
            <img
              src="/src/assets/new-logo.png"
              alt="Swaply Logo"
              className="h-30 w-30 rounded-lg object-cover"
            />
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                UniLance
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              The student marketplace where you can offer your skills, learn
              from peers, and earn money – all within your university community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/listings">Browse Offers</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/createOffer" search={{ editId: undefined }}>
                  Create an Offer
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Why choose <span className="text-primary">UniLance</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Built by students, for students – UniLance makes skill exchange
              easy and rewarding.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 text-4xl">🎓</div>
                <CardTitle>University Verified</CardTitle>
                <CardDescription>
                  Connect only with students from your university. Safe,
                  trusted, and verified community.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 text-4xl">💰</div>
                <CardTitle>Earn Real Money</CardTitle>
                <CardDescription>
                  Set your own prices, get paid securely, and withdraw your
                  earnings anytime.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 text-4xl">🛡️</div>
                <CardTitle>Safe Payments (Escrow)</CardTitle>
                <CardDescription>
                  Money is held securely until the service is completed. Zero
                  risk for both parties.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 text-4xl">🌍</div>
                <CardTitle>Online & In-Person</CardTitle>
                <CardDescription>
                  Choose how you want to teach – completely online, in-person,
                  or both.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 text-4xl">⭐</div>
                <CardTitle>Ratings & Reviews</CardTitle>
                <CardDescription>
                  Build your reputation with student reviews. High ratings
                  attract more clients.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 text-4xl">🚀</div>
                <CardTitle>Build Your Portfolio</CardTitle>
                <CardDescription>
                  Gain real-world experience, build your client base, and grow
                  your skills.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              How <span className="text-primary">UniLance</span> Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Three simple steps to start your journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up with your university email and create your profile
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Post or Browse Offers
              </h3>
              <p className="text-muted-foreground">
                Offer your skills or find the service you need from other
                students
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Connect & Earn</h3>
              <p className="text-muted-foreground">
                Book a session, complete the service, and get paid securely
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="flex flex-col items-center py-12 text-center md:py-16">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to start?
              </h2>
              <p className="mb-8 max-w-2xl text-muted-foreground">
                Join thousands of students already using UniLance to learn,
                teach, and earn.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/listings">Browse Offers</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/createOffer" search={{ editId: undefined }}>
                    Create an Offer
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
