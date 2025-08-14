"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="mx-auto max-w-md">
          <Card className="border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="font-montserrat text-2xl">Únete a la Carrera</CardTitle>
              <CardDescription>Inicia sesión o regístrate para comenzar a hacer predicciones</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Iniciar Sesión</Button>
                </TabsContent>

                <TabsContent value="register" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-reg">Email</Label>
                    <Input id="email-reg" type="email" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-reg">Contraseña</Label>
                    <Input id="password-reg" type="password" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Registrarse</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
