
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// This would be a server action in a real scenario
async function addNewsItem(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;
  // Here you would interact with your PostgreSQL database
  console.log('Adding news item:', { title, content, imageUrl });
  // Redirect or show success message
}


export default function AdminAjouterActualitePage() {
  return (
    <>
      <AdminHeader pageTitle="Ajouter une Actualité" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle Actualité</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addNewsItem} className="space-y-6">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" placeholder="Titre de l'actualité" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="content">Contenu</Label>
                <Textarea id="content" name="content" placeholder="Contenu de l'actualité..." rows={10} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="imageUrl">URL de l'image (Optionnel)</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg" className="mt-1" />
              </div>
              {/* Add fields for date, status (published/draft) etc. as needed */}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Annuler</Button>
                <Button type="submit">Publier l'actualité</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
