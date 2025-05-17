
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminMediasPage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion des Médias" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Albums Photos et Vidéos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion de la galerie média à venir.</p>
            {/* TODO: CRUD for photo albums, video links (YouTube embeds, etc.) */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
