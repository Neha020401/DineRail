import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TrainSearch from '@/components/TrainSearch';
import PopularFood from '@/components/PopularFood';
import ProviderSection from '@/components/ProviderSection';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import { Train, Utensils, Ticket, Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button'; // assuming you're using shadcn/ui or similar

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Quick Services */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/trains">
                <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Train className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Find Trains</h3>
                  <p className="text-gray-600">Search trains by source, destination, and date.</p>
                </div>
              </Link>

              <Link href="/services/food">
                <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-yellow-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Utensils className="h-10 w-10 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Order Food</h3>
                  <p className="text-gray-600">Get food delivered to your train seat.</p>
                </div>
              </Link>

              <Link href="/login">
                <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-green-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Ticket className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Book Tickets</h3>
                  <p className="text-gray-600">Book train tickets easily and securely.</p>
                </div>
              </Link>

              <Link href="/login">
                <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-purple-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track Orders</h3>
                  <p className="text-gray-600">Manage your food and train bookings.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Train Search Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Search Trains</h2>
            <TrainSearch />
          </div>
        </section>

        {/* Popular Food Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Popular Food Items</h2>
              <Link href="/services/food">
                <Button variant="outline" className="flex items-center gap-2">
                  Browse All <Search className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <PopularFood />
          </div>
        </section>

        {/* Provider Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Food Partners</h2>
            <ProviderSection />
          </div>
        </section>

        {/* Features */}
        <Features />

        {/* Testimonials */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <Testimonials />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who make their journey smooth and delicious with our service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/services/food">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Food Options
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
