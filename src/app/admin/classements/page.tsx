
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminClassementsPage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion des Classements" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Classements des Ligues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de modification manuelle des classements (si nécessaire) à venir.</p>
            {/* TODO: Display current standings and allow overrides or manual input */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
