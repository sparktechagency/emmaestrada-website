// components/Footer.tsx
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import Container from "./Container"

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t pb-10">
      <Container >
        <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Artify</h2>
            <p className="text-sm text-muted-foreground">
              Discover, buy, and sell exclusive digital artworks by talented artists worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-3">Stay Updated</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Artify. All rights reserved.</p>

          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-primary"><Facebook size={18} /></Link>
            <Link href="#" className="hover:text-primary"><Twitter size={18} /></Link>
            <Link href="#" className="hover:text-primary"><Instagram size={18} /></Link>
            <Link href="mailto:info@artify.com" className="hover:text-primary"><Mail size={18} /></Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
