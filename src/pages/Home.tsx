import { useState } from "react";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

// Featured product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  discount?: number;
};

// Sample products data
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.8,
    discount: 15,
  },
  {
    id: 2,
    name: "Minimalist Desk Lamp",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500&auto=format&fit=crop",
    category: "Home Decor",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
    category: "Fitness",
    rating: 4.7,
    discount: 10,
  },
  {
    id: 4,
    name: "Stylish Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=500&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.3,
    discount: 20,
  },
];

// Sample categories
const categories = [
  { name: "Electronics", icon: "🔌" },
  { name: "Fashion", icon: "👕" },
  { name: "Home & Kitchen", icon: "🏠" },
  { name: "Beauty", icon: "✨" },
  { name: "Sports", icon: "🏀" },
  { name: "Books", icon: "📚" },
];

// Banner slides
const bannerSlides = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Up to 40% off",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop",
    color: "bg-amber-50",
  },
  {
    id: 2,
    title: "New Electronics",
    subtitle: "Latest gadgets with free shipping",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop",
    color: "bg-blue-50",
  },
  {
    id: 3,
    title: "Home Essentials",
    subtitle: "Make your space beautiful",
    cta: "Discover",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop",
    color: "bg-rose-50",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-slate-900">
                ShopHub
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-slate-900 hover:text-slate-600 font-medium">
                Home
              </a>
              <a href="/products" className="text-slate-600 hover:text-slate-900">
                Products
              </a>
              <a href="/categories" className="text-slate-600 hover:text-slate-900">
                Categories
              </a>
              <a href="/deals" className="text-slate-600 hover:text-slate-900">
                Deals
              </a>
              <a href="/about" className="text-slate-600 hover:text-slate-900">
                About
              </a>
            </nav>

            {/* Search, Cart, and User */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-64">
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 rounded-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              </Button>
              <Button variant="default" className="rounded-full">
                Sign In
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 rounded-full w-full"
                />
                <Search className="absolute left-7 top-[4.7rem] h-5 w-5 text-slate-400" />
              </div>
              <nav className="flex flex-col space-y-3">
                <a href="/" className="text-slate-900 font-medium">
                  Home
                </a>
                <a href="/products" className="text-slate-600">
                  Products
                </a>
                <a href="/categories" className="text-slate-600">
                  Categories
                </a>
                <a href="/deals" className="text-slate-600">
                  Deals
                </a>
                <a href="/about" className="text-slate-600">
                  About
                </a>
              </nav>
              <div className="flex space-x-4 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart (3)
                </Button>
              </div>
              <Button variant="default" className="w-full">
                Sign In
              </Button>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Banner Carousel */}
        <section className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {bannerSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className={`${slide.color} w-full py-12 md:py-24 px-6 md:px-12 relative overflow-hidden`}>
                    <div className="container mx-auto flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 z-10 space-y-4 text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">{slide.title}</h1>
                        <p className="text-lg md:text-xl text-slate-700">{slide.subtitle}</p>
                        <Button size="lg" className="mt-4">
                          {slide.cta}
                        </Button>
                      </div>
                      <div className="md:w-1/2 mt-8 md:mt-0">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="mx-auto rounded-lg object-cover h-[300px] md:h-[400px]"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* Categories */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href={`/category/${category.name.toLowerCase()}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <a href="/products" className="text-blue-600 hover:underline">
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-56 bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 rounded-full h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <CardContent className="pt-4 flex-grow">
                    <div className="text-sm text-slate-500 mb-1">{product.category}</div>
                    <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-baseline mb-1">
                      {product.discount ? (
                        <>
                          <span className="text-lg font-bold">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-slate-500 line-through ml-2 text-sm">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-300"}`}>
                              ★
                            </span>
                          ))}
                      </div>
                      <span className="text-xs text-slate-500 ml-1">({product.rating})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="default" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}
        <section className="py-12 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Special Offer</h2>
              <p className="text-lg md:text-xl mb-6">Use code <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">WELCOME20</span> for 20% off your first order!</p>
              <Button size="lg" variant="default" className="bg-white text-purple-700 hover:bg-white/90">
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-4 mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full text-blue-600">🚚</div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-slate-600 text-sm">On orders over $50</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4 mx-auto bg-green-100 w-16 h-16 flex items-center justify-center rounded-full text-green-600">↩️</div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-slate-600 text-sm">30-day return policy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4 mx-auto bg-amber-100 w-16 h-16 flex items-center justify-center rounded-full text-amber-600">🔒</div>
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-slate-600 text-sm">Safe & encrypted</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4 mx-auto bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full text-purple-600">💬</div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-slate-600 text-sm">We're here to help</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 px-4 bg-slate-100">
          <div className="container mx-auto max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Subscribe to our Newsletter</h2>
            <p className="text-slate-600 mb-6">Get the latest updates, deals and special offers directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ShopHub</h3>
              <p className="mb-4 text-sm">Your one-stop destination for all your shopping needs.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">All Products</a></li>
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white">Featured</a></li>
                <li><a href="#" className="hover:text-white">Discounts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Customer Service</a></li>
                <li><a href="#" className="hover:text-white">My Account</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
                <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2025 ShopHub. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}