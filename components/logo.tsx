import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <img src="/sipremium-logo.jpg" alt="SIPREMIUM Logo" className={`w-auto ${sizeClasses[size]}`} />
      {showText && (
        <div className="hidden sm:block">
          <h1 className="font-bold text-gray-800 text-lg">SIPREMIUM</h1>
          <p className="text-xs text-gray-600">Premium Account Marketplace</p>
        </div>
      )}
    </Link>
  )
}
