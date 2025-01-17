import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListingCard } from "@/components/ListingCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("category")
        .eq('category', 'category') // Using eq instead of distinct
        .then(result => {
          // Manually get unique categories
          if (result.data) {
            const uniqueCategories = [...new Set(result.data.map(item => item.category))];
            return uniqueCategories;
          }
          return [];
        });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["listings", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("listings")
        .select(`
          *,
          profiles:seller_id (
            username,
            full_name
          )
        `)
        .order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-accent">Community Hub</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover local businesses, products, and services in your community
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </header>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div>Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No listings found. Be the first to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                description={listing.description || ""}
                price={listing.price?.toString()}
                image={listing.image_url || "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9"}
                category={listing.category}
                contact={listing.profiles?.username || "contact@example.com"} // Changed from email to username
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;