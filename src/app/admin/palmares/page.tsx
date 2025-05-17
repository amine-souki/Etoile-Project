
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPalmaresPage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion du Palmarès" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Titres Remportés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion des titres et trophées du club à venir.</p>
            {/* TODO: Add forms to add/edit trophies, years won, etc. */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
