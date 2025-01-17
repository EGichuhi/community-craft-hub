import { useState } from "react";
import { ListingCard } from "@/components/ListingCard";
import { CategoryFilter } from "@/components/CategoryFilter";

// Sample data - in a real app this would come from an API
const listings = [
  {
    id: 1,
    title: "Handmade Pottery",
    description: "Beautiful handcrafted ceramic bowls and vases",
    price: "45",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9",
    category: "Crafts",
    contact: "potter@example.com"
  },
  {
    id: 2,
    title: "Web Development Services",
    description: "Professional website development for small businesses",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Services",
    contact: "webdev@example.com"
  },
  {
    id: 3,
    title: "Organic Honey",
    description: "Local, raw, and unfiltered honey from happy bees",
    price: "12",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    category: "Food",
    contact: "beekeeper@example.com"
  },
  {
    id: 4,
    title: "Yoga Classes",
    description: "Group and private yoga sessions for all levels",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    category: "Health",
    contact: "yoga@example.com"
  }
];

const categories = ["Crafts", "Services", "Food", "Health"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredListings = selectedCategory === "all"
    ? listings
    : listings.filter(listing => listing.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-accent">Community Hub</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover local businesses, products, and services in your community
          </p>
        </header>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;