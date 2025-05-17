
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminBoutiquePage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion de la Boutique" />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Produits et Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interface de gestion des produits de la boutique (si gérée en interne) et des commandes à venir.</p>
            {/* TODO: CRUD for products, view orders if integrated */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
