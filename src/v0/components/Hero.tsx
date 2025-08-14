import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Racing stripes background */}
      <div className="absolute inset-0 racing-stripes opacity-5"></div>

      {/* Animated racing line */}
      <div className="absolute top-1/2 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-20">
        <div className="race-line h-full w-20 bg-accent"></div>
      </div>

      <div className="container relative py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main heading */}
          <h1 className="font-montserrat text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-foreground">Predice los</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Campeones
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Únete a la comunidad más apasionada de Fórmula 1. Haz tus predicciones, compite con amigos y demuestra que
            conoces el mundo de las carreras.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Comenzar a Predecir
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Ver Torneos
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">Predictores Activos</div>
            </Card>
            <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-sm text-muted-foreground">Predicciones Correctas</div>
            </Card>
            <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-sm text-muted-foreground">Carreras Analizadas</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
