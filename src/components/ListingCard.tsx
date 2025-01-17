import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ListingProps {
  title: string;
  description: string;
  price?: string;
  image: string;
  category: string;
  contact: string;
}

export const ListingCard = ({ title, description, price, image, category, contact }: ListingProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          {price && <span className="text-primary font-bold">${price}</span>}
        </div>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <Badge variant="secondary" className="mb-2">
          {category}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" onClick={() => window.location.href = `mailto:${contact}`}>
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};