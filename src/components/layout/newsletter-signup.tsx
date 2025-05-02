import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  return (
    <section className="bg-primary py-10 px-4 md:px-6">
      <div className="container mx-auto max-w-3xl text-center text-primary-foreground">
        <h3 className="text-2xl font-bold mb-2">Restez informé</h3>
        <p className="text-sm mb-6 opacity-90">
          Abonnez-vous à notre newsletter pour recevoir les dernières actualités, offres spéciales et informations sur les matchs directement dans votre boîte mail.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre email"
            className="bg-white text-foreground placeholder:text-muted-foreground flex-grow"
            required
          />
          <Button type="submit" variant="secondary" className="w-full sm:w-auto">
            S'abonner
          </Button>
        </form>
         {/* Add form submission logic later */}
         <p className="text-xs text-primary-foreground/70 mt-4">
           La soumission du formulaire nécessite une implémentation backend.
         </p>
      </div>
    </section>
  );
}
