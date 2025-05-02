import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Galerie Média - Etoile Sportive Du Sahel',
};

// Mock data for albums and videos
const albums = [
  { id: 1, title: 'Match vs Club Africain', event: 'match', coverUrl: 'https://picsum.photos/400/300?random=1', imageCount: 25, dataAiHint: "football match crowd" },
  { id: 2, title: 'Entraînement 15/07', event: 'training', coverUrl: 'https://picsum.photos/400/300?random=2', imageCount: 18, dataAiHint: "football training players" },
  { id: 3, title: 'Coulisses du Derby', event: 'behind-the-scenes', coverUrl: 'https://picsum.photos/400/300?random=3', imageCount: 30, dataAiHint: "football locker room" },
  { id: 4, title: 'Célébration Titre 2023', event: 'celebration', coverUrl: 'https://picsum.photos/400/300?random=4', imageCount: 45, dataAiHint: "football trophy celebration" },
];

const videos = [
  { id: 1, title: 'Résumé: ESS 2-1 CA', youtubeId: 'dQw4w9WgXcQ', thumbnailUrl: 'https://picsum.photos/400/225?random=5', dataAiHint: "football highlights goal" },
  { id: 2, title: 'Interview Coach', youtubeId: 'oHg5SJYRHA0', thumbnailUrl: 'https://picsum.photos/400/225?random=6', dataAiHint: "football coach interview" },
  { id: 3, title: 'Best Goals Saison 2023', youtubeId: 'L_jWHffIx5E', thumbnailUrl: 'https://picsum.photos/400/225?random=7', dataAiHint: "football compilation goals" },
];


export default function MediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <ImageIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Galerie Média</h1>
      </div>

      {/* Photo Albums Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Albums Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
               <div className="relative h-48 w-full">
                 <Image
                   src={album.coverUrl}
                   alt={album.title}
                   layout="fill"
                   objectFit="cover"
                   data-ai-hint={album.dataAiHint}
                   className="transition-transform duration-300 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                 <div className="absolute bottom-2 left-2 text-white">
                     <p className="text-sm font-medium">{album.title}</p>
                     <p className="text-xs opacity-80">{album.imageCount} photos</p>
                 </div>
               </div>
            </Card>
          ))}
        </div>
        {albums.length === 0 && (
          <p className="text-center text-muted-foreground">Aucun album photo disponible.</p>
        )}
      </section>

      {/* Video Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Video className="h-5 w-5" /> Vidéos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
             <Card key={video.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
               <div className="relative aspect-video w-full">
                  {/* Placeholder for YouTube Embed or Link */}
                  <Image
                     src={video.thumbnailUrl}
                     alt={video.title}
                     layout="fill"
                     objectFit="cover"
                     data-ai-hint={video.dataAiHint}
                     className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Video className="h-12 w-12 text-white" />
                  </div>
               </div>
               <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{video.title}</p>
               </CardContent>
            </Card>
          ))}
        </div>
        {videos.length === 0 && (
          <p className="text-center text-muted-foreground">Aucune vidéo disponible.</p>
        )}
      </section>
       <p className="text-center text-muted-foreground italic pt-4">
         Note: La fonctionnalité de visualisation plein écran et l'intégration vidéo réelle seront implémentées.
       </p>
    </div>
  );
}
