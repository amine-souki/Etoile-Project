import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, Product } from '@/services/eshop';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Boutique - Etoile Sportive Du Sahel',
};

export default async function BoutiquePage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <ShoppingCart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Boutique Officielle</h1>
      </div>

       <p className="text-muted-foreground">
           Découvrez notre sélection de produits officiels pour afficher fièrement vos couleurs.
           Cliquez sur "Acheter" pour être redirigé vers la plateforme de vente.
        </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 rounded-lg border">
             <div className="relative aspect-square w-full overflow-hidden">
               <Image
                 src={product.imageUrl}
                 alt={product.name}
                 layout="fill"
                 objectFit="cover"
                 data-ai-hint="football merchandise jersey scarf"
                 className="transition-transform duration-300 group-hover:scale-105"
               />
                 {/* Optional: Add a "New" or "Sale" badge */}
                 {/* <Badge className="absolute top-2 right-2">Nouveau</Badge> */}
             </div>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-lg font-semibold leading-tight truncate">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pt-0 pb-3">
              <CardDescription className="text-sm line-clamp-3">{product.description}</CardDescription>
              <p className="mt-2 font-semibold text-primary text-lg">{product.price.toFixed(2)} TND</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={product.buyUrl} target="_blank" rel="noopener noreferrer">
                  Acheter <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       {products.length === 0 && (
         <p className="text-center text-muted-foreground py-10">La boutique est actuellement vide. Revenez bientôt !</p>
       )}
    </div>
  );
}
