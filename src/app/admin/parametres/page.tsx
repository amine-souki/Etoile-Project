
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminParametresPage() {
  return (
    <>
      <AdminHeader pageTitle="Paramètres de l'Administration" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration Générale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion des paramètres généraux du site et de l'admin à venir.</p>
            {/* TODO: Site settings, admin user management (if applicable) */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
