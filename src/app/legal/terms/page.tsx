import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Conditions Générales - Etoile Sportive Du Sahel',
};

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Conditions Générales d'Utilisation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acceptation des Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            En accédant et en utilisant ce site web, vous acceptez d'être lié par les présentes conditions générales d'utilisation.
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Utilisation du Site</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Vous vous engagez à utiliser ce site uniquement à des fins légales et conformément à toutes les lois applicables.
            Toute utilisation abusive ou non autorisée du site est interdite.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Propriété Intellectuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Tout le contenu présent sur ce site, y compris les textes, images, logos, marques, est la propriété de
            l'Etoile Sportive Du Sahel ou de ses concédants de licence et est protégé par les lois sur la propriété intellectuelle.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limitation de Responsabilité</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            L'Etoile Sportive Du Sahel ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Nous nous réservons le droit de modifier ces conditions générales à tout moment. Les modifications prendront effet dès leur publication sur le site.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>


      <p className="text-center text-muted-foreground italic pt-4">
        Note: Le contenu détaillé des conditions générales sera ajouté ultérieurement.
      </p>

    </div>
  );
}
