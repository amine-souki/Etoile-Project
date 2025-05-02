import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité - Etoile Sportive Du Sahel',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Politique de Confidentialité</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Cette politique de confidentialité décrit comment l'Etoile Sportive Du Sahel collecte, utilise et protège
            vos informations personnelles lorsque vous utilisez notre site web.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collecte des Informations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Nous pouvons collecter des informations personnelles telles que votre nom, adresse email, etc., lorsque vous
            vous inscrivez à notre newsletter, créez un compte, ou interagissez avec notre site.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Utilisation des Informations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Les informations collectées sont utilisées pour personnaliser votre expérience, améliorer notre site web,
            envoyer des emails périodiques (si vous vous abonnez à la newsletter), etc.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Protection des Informations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Nous mettons en œuvre diverses mesures de sécurité pour maintenir la sécurité de vos informations personnelles.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

        <Card>
        <CardHeader>
          <CardTitle>Vos Droits</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Vous avez le droit d'accéder, de rectifier ou de supprimer vos informations personnelles. Contactez-nous pour exercer ces droits.
            {/* Placeholder content */}
          </p>
        </CardContent>
      </Card>

      <p className="text-center text-muted-foreground italic pt-4">
        Note: Le contenu détaillé de la politique de confidentialité sera ajouté ultérieurement.
      </p>

    </div>
  );
}
