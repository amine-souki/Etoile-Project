
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminEquipesPage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion des Équipes" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Effectifs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion des effectifs des sections sportives à venir.</p>
            {/* TODO: Add tables/forms for managing players, coaches, etc. for Football, Handball, Basketball, Volleyball */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
