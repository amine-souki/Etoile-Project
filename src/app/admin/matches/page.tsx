
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminMatchesPage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion des Matches" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier et Résultats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion des matches (prévus et résultats) à venir.</p>
            {/* TODO: Add forms to add/edit matches, scores, etc. */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
