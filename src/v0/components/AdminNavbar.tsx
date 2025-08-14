import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AdminNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent">
            <span className="text-sm font-bold text-accent-foreground">A</span>
          </div>
          <span className="font-montserrat text-xl font-bold">Panel Administrativo</span>
          <Badge variant="destructive" className="ml-2">
            Admin
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/">Volver al Inicio</a>
          </Button>
          <Button variant="ghost" size="sm">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </nav>
  )
}
