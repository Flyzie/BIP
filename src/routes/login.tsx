// routes/login.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const Route = createFileRoute("/login")({
  component: LoginComponent,
})

function LoginComponent() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Tutaj później dodasz rzeczywistą logikę logowania
    localStorage.setItem("isLoggedIn", "true")
    navigate({ to: "/" })
  }

  const handleMicrosoftLogin = () => {
    // Mock logowania przez Microsoft
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("loginMethod", "microsoft")
    navigate({ to: "/" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Card className="w-full max-w-md border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl dark:bg-black/20">
        <CardHeader className="space-y-4 text-center">
          {/* Logo */}
<div className="flex justify-center">
  <img 
    src="/src/assets/new-logo.png" 
    alt="BIP Logo" 
    className="h-30 w-auto object-contain"
  />
</div>
          
          <CardTitle className="text-3xl font-bold">
            Welcome to UniLance
          </CardTitle>
          
          <CardDescription className="text-base">
            Your academic marketplace for student services
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button 
            onClick={handleLogin}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <svg 
              className="mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
              />
            </svg>
            Login with Email
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button 
            onClick={handleMicrosoftLogin}
            variant="outline"
            size="lg"
            className="w-full border-white/20 bg-white/50 hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80"
          >
            <svg 
              className="mr-2 h-5 w-5" 
              viewBox="0 0 23 23" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 0H0V11H11V0Z" fill="#F25022"/>
              <path d="M23 0H12V11H23V0Z" fill="#7FBA00"/>
              <path d="M11 12H0V23H11V12Z" fill="#00A4EF"/>
              <path d="M23 12H12V23H23V12Z" fill="#FFB900"/>
            </svg>
            Login with Microsoft
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center text-center text-sm text-muted-foreground">
          <p>
            By logging in, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginComponent