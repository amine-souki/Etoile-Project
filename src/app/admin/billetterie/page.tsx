
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminBilletteriePage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion de la Billetterie" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Vente de Billets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion des informations de billetterie (liens, tarifs) à venir.</p>
            {/* TODO: Manage ticket links, prices, match availability */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
