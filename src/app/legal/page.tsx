import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Mentions Légales - Etoile Sportive Du Sahel',
};

export default function LegalPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Mentions Légales</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations sur l'éditeur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Nom du Club:</strong> Etoile Sportive Du Sahel</p>
          <p><strong>Adresse:</strong> Avenue Mohamed Karoui, 4000 Sousse, Tunisie</p>
          <p><strong>Contact:</strong> contact@etoile-du-sahel.com</p>
          {/* Add more legal information as required */}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Hébergement</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Informations sur l'hébergeur du site...</p>
          {/* Add hosting provider details */}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Propriété Intellectuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Le contenu de ce site (textes, images, logos, etc.) est la propriété de l'Etoile Sportive Du Sahel ou de ses partenaires et est protégé par les lois sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.</p>
           {/* Add more details on intellectual property */}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Données Personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Informations sur la collecte et le traitement des données personnelles...</p>
           {/* Add details on data privacy policy */}
        </CardContent>
      </Card>

    </div>
  );
}
