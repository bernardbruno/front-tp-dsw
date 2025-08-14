"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pilotos")

  const pilotos = [
    { id: 1, nombre: "Max Verstappen", escuderia: "Red Bull Racing", numero: 1 },
    { id: 2, nombre: "Lewis Hamilton", escuderia: "Mercedes", numero: 44 },
    { id: 3, nombre: "Charles Leclerc", escuderia: "Ferrari", numero: 16 },
  ]

  const escuderias = [
    { id: 1, nombre: "Red Bull Racing", pais: "Austria", color: "#1E41FF" },
    { id: 2, nombre: "Mercedes", pais: "Alemania", color: "#00D2BE" },
    { id: 3, nombre: "Ferrari", pais: "Italia", color: "#DC143C" },
  ]

  const circuitos = [
    { id: 1, nombre: "Circuito de Mónaco", pais: "Mónaco", longitud: "3.337 km" },
    { id: 2, nombre: "Silverstone", pais: "Reino Unido", longitud: "5.891 km" },
    { id: 3, nombre: "Spa-Francorchamps", pais: "Bélgica", longitud: "7.004 km" },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-montserrat text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">Gestiona pilotos, escuderías y circuitos de Fórmula 1</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pilotos">Pilotos</TabsTrigger>
          <TabsTrigger value="escuderias">Escuderías</TabsTrigger>
          <TabsTrigger value="circuitos">Circuitos</TabsTrigger>
        </TabsList>

        <TabsContent value="pilotos" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-montserrat text-2xl font-semibold">Gestión de Pilotos</h2>
            <Button className="bg-primary hover:bg-primary/90">Agregar Piloto</Button>
          </div>

          <div className="grid gap-4">
            {pilotos.map((piloto) => (
              <Card key={piloto.id} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {piloto.numero}
                    </div>
                    <div>
                      <h3 className="font-semibold">{piloto.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{piloto.escuderia}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="escuderias" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-montserrat text-2xl font-semibold">Gestión de Escuderías</h2>
            <Button className="bg-primary hover:bg-primary/90">Agregar Escudería</Button>
          </div>

          <div className="grid gap-4">
            {escuderias.map((escuderia) => (
              <Card key={escuderia.id} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full" style={{ backgroundColor: escuderia.color }}></div>
                    <div>
                      <h3 className="font-semibold">{escuderia.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{escuderia.pais}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="circuitos" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-montserrat text-2xl font-semibold">Gestión de Circuitos</h2>
            <Button className="bg-primary hover:bg-primary/90">Agregar Circuito</Button>
          </div>

          <div className="grid gap-4">
            {circuitos.map((circuito) => (
              <Card key={circuito.id} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold">{circuito.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{circuito.pais}</p>
                    <Badge variant="secondary" className="mt-1">
                      {circuito.longitud}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
