
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data for news items in admin
const newsItemsAdmin = [
  { id: '1', title: 'Match Day!', date: '2024-05-02', status: 'Publié' },
  { id: '2', title: 'New Player Signed', date: '2024-05-01', status: 'Publié' },
  { id: '3', title: 'Upcoming Press Conference', date: '2024-05-05', status: 'Brouillon' },
];

export default function AdminActualitesPage() {
  return (
    <>
      <AdminHeader pageTitle="Gestion des Actualités" />
      <div className="mt-6 space-y-6">
        <div className="flex justify-end">
          <Button asChild>
            <Link href="/admin/actualites/ajouter">
              <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une actualité
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Liste des actualités</CardTitle>
          </CardHeader>
          <CardContent>
            {newsItemsAdmin.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Titre</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Statut</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsItemsAdmin.map((item) => (
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.title}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4 space-x-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="destructive" size="sm">Supprimer</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-center">Aucune actualité à gérer pour le moment.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
