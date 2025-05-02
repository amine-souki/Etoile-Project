import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, UserCheck, ClipboardList } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Académie - Etoile Sportive Du Sahel',
};

// Mock data - Replace with actual data fetching
const academyData = {
  sections: [
    { name: 'U20', coach: 'Mohamed Ali Nafkha', dataAiHint: "youth football team action" },
    { name: 'U17', coach: 'Karim Haggui', dataAiHint: "teenage football players" },
    { name: 'U15', coach: 'Anis Boujelbene', dataAiHint: "young football players training" },
    { name: 'École', coach: 'Various', dataAiHint: "kids playing football" },
  ],
  staff: [
    { name: 'Patrick Cordoba', role: 'Directeur Technique', imageUrl: 'https://picsum.photos/100/100?random=51', dataAiHint: "man portrait suit" },
    { name: 'Zoubaier Baya', role: 'Conseiller Technique', imageUrl: 'https://picsum.photos/100/100?random=52', dataAiHint: "man portrait casual" },
    { name: 'Dr. Ahmed Ben Salah', role: 'Médecin Sportif', imageUrl: 'https://picsum.photos/100/100?random=53', dataAiHint: "doctor portrait" },
  ],
  talents: [
    { name: 'Ahmed Sassi', category: 'U20', position: 'Attaquant', imageUrl: 'https://picsum.photos/100/100?random=61', dataAiHint: "young football player portrait" },
    { name: 'Fatma Gharbi', category: 'U17', position: 'Milieu', imageUrl: 'https://picsum.photos/100/100?random=62', dataAiHint: "teenage female football player" },
  ],
  events: [
    { title: 'Stages d\'été 2024', description: 'Inscriptions ouvertes pour les stages de perfectionnement.', status: 'Ouvert' },
    { title: 'Journée de détection U15', description: 'Opportunité pour les jeunes talents nés en 2009.', status: 'Terminé' },
  ],
};

export default function AcademyPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <GraduationCap className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Académie ESS</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Sections Jeunes</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {academyData.sections.map((section) => (
             <div key={section.name} className="border p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <Image
                    src={`https://picsum.photos/150/100?random=${section.name}`} // Placeholder image
                    alt={`Section ${section.name}`}
                    width={150}
                    height={100}
                    className="rounded-md mx-auto mb-2"
                    data-ai-hint={section.dataAiHint}
                />
               <h3 className="font-semibold text-lg">{section.name}</h3>
               <p className="text-sm text-muted-foreground">Coach: {section.coach}</p>
             </div>
          ))}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-primary" /> Staff Éducatif et Technique</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
           {academyData.staff.map((member) => (
               <div key={member.name} className="text-center p-2 border rounded-lg hover:shadow-sm transition-shadow">
                   <Image
                       src={member.imageUrl}
                       alt={member.name}
                       width={80}
                       height={80}
                       className="rounded-full mx-auto mb-2 border-2 border-primary/50"
                       data-ai-hint={member.dataAiHint}
                   />
                   <p className="font-medium text-sm">{member.name}</p>
                   <p className="text-xs text-muted-foreground">{member.role}</p>
               </div>
           ))}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" /> Stages et Détections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           {academyData.events.map((event, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                 <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{event.title}</h4>
                    <Badge variant={event.status === 'Ouvert' ? 'default' : 'secondary'}>{event.status}</Badge>
                 </div>
                 <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              </div>
           ))}
           {academyData.events.length === 0 && <p className="text-muted-foreground text-center">Aucun événement prévu pour le moment.</p>}
        </CardContent>
      </Card>

       {/* Talents Section (Optional simplified view) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Jeunes Talents</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
             {academyData.talents.map((talent) => (
                 <div key={talent.name} className="flex items-center gap-3 p-2 border rounded-lg bg-muted/30">
                     <Image
                         src={talent.imageUrl}
                         alt={talent.name}
                         width={40}
                         height={40}
                         className="rounded-full"
                         data-ai-hint={talent.dataAiHint}
                     />
                     <div>
                         <p className="font-medium text-sm">{talent.name} ({talent.category})</p>
                         <p className="text-xs text-muted-foreground">{talent.position}</p>
                     </div>
                 </div>
             ))}
             {academyData.talents.length === 0 && <p className="text-muted-foreground text-center w-full">Présentation des jeunes talents à venir.</p>}
          </CardContent>
        </Card>

    </div>
  );
}
