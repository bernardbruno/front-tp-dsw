import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Features = () => {
  const features = [
    {
      title: "Predicciones en Tiempo Real",
      description: "Haz tus predicciones antes de cada carrera y ve los resultados en vivo.",
      status: "Disponible",
      icon: "🏁",
    },
    {
      title: "Torneos Competitivos",
      description: "Participa en torneos semanales y mensuales con otros fanáticos.",
      status: "Próximamente",
      icon: "🏆",
    },
    {
      title: "Foro de Discusión",
      description: "Debate estrategias y análisis con la comunidad de F1.",
      status: "Próximamente",
      icon: "💬",
    },
    {
      title: "Estadísticas Detalladas",
      description: "Analiza tu rendimiento y mejora tus predicciones.",
      status: "Disponible",
      icon: "📊",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-montserrat text-3xl font-bold tracking-tight sm:text-4xl">
            Mantente Adelante del Pelotón
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Herramientas y características diseñadas para los verdaderos fanáticos de la F1
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{feature.icon}</div>
                  <Badge
                    variant={feature.status === "Disponible" ? "default" : "secondary"}
                    className={feature.status === "Disponible" ? "bg-primary" : ""}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="font-montserrat text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>

              {/* Racing line accent */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features;
