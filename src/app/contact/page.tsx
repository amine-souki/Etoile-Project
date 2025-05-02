import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Contact - Etoile Sportive Du Sahel',
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <Mail className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Contactez-nous</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-muted-foreground">Avenue Mohamed Karoui, 4000 Sousse, Tunisie</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Téléphone</p>
                <p className="text-muted-foreground">+216 XX XXX XXX</p> {/* Replace with actual phone */}
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">contact@etoile-du-sahel.com</p>
              </div>
            </div>
             {/* Add Map Embed if desired */}
             {/* <div className="h-48 bg-muted rounded-lg mt-4">Map Placeholder</div> */}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Envoyer un message</CardTitle>
          </CardHeader>
          <CardContent>
             {/* Basic form structure - Needs Server Action or API endpoint for submission */}
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="name">Nom</Label>
                   <Input id="name" placeholder="Votre nom" required />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <Input id="email" type="email" placeholder="Votre email" required />
                 </div>
              </div>
               <div className="space-y-2">
                 <Label htmlFor="subject">Sujet</Label>
                 <Input id="subject" placeholder="Sujet de votre message" required />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="message">Message</Label>
                 <Textarea id="message" placeholder="Votre message ici..." rows={5} required />
               </div>
               <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Envoyer le Message
               </Button>
               <p className="text-xs text-muted-foreground text-center pt-2">Note: La soumission du formulaire nécessite une implémentation backend.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
