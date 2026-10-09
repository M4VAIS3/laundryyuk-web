import React, { useState } from 'react';
import { Search, Network, Users, Shirt, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function RelationDisplay() {
  const [customerIdSearch, setCustomerIdSearch] = useState('');
  const [serviceCodeSearch, setServiceCodeSearch] = useState('');
  const [activeTab, setActiveTab] = useState('customer-service');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tampilan Relasi</h1>
        <p className="text-gray-500 mt-1">
          Lihat hubungan antara customer dan layanan dalam transaksi
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customer-service">
            Layanan dari Customer
          </TabsTrigger>
          <TabsTrigger value="service-customer">
            Customer dari Layanan
          </TabsTrigger>
          <TabsTrigger value="all-customer">
            Semua Customer
          </TabsTrigger>
          <TabsTrigger value="all-service">
            Semua Layanan
          </TabsTrigger>
        </TabsList>

        {/* Layanan dari Customer Tertentu */}
        <TabsContent value="customer-service" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Cari Layanan yang Digunakan Customer
            </h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="customerId">ID Customer</Label>
                <Input
                  id="customerId"
                  placeholder="Contoh: C001"
                  value={customerIdSearch}
                  onChange={(e) => setCustomerIdSearch(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <Network className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                Masukkan ID Customer untuk melihat layanan yang pernah digunakan
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Customer dari Layanan Tertentu */}
        <TabsContent value="service-customer" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Cari Customer yang Menggunakan Layanan
            </h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="serviceCode">Kode Layanan</Label>
                <Input
                  id="serviceCode"
                  placeholder="Contoh: L001"
                  value={serviceCodeSearch}
                  onChange={(e) => setServiceCodeSearch(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <Network className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                Masukkan Kode Layanan untuk melihat customer yang pernah menggunakan
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Semua Customer dengan Layanan */}
        <TabsContent value="all-customer" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Daftar Semua Customer dengan Layanan Mereka
            </h2>
            
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada data relasi customer-layanan</p>
              <p className="text-sm text-gray-400 mt-2">
                Buat transaksi untuk melihat relasi antara customer dan layanan
              </p>
            </div>
          </div>

          {/* Example of how data would be displayed */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">C001 - Budi Santoso</p>
                      <p className="text-sm text-gray-500">Regular Member</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">3 Transaksi</Badge>
                </div>
                <div className="ml-13 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowRight className="w-4 h-4" />
                    <Shirt className="w-4 h-4" />
                    <span>L001 - Cuci Kering (Reguler)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowRight className="w-4 h-4" />
                    <Shirt className="w-4 h-4" />
                    <span>L002 - Cuci Setrika (Reguler)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Semua Layanan dengan Customer */}
        <TabsContent value="all-service" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shirt className="w-5 h-5" />
              Daftar Semua Layanan dengan Customer Mereka
            </h2>
            
            <div className="text-center py-12">
              <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada data relasi layanan-customer</p>
              <p className="text-sm text-gray-400 mt-2">
                Buat transaksi untuk melihat relasi antara layanan dan customer
              </p>
            </div>
          </div>

          {/* Example of how data would be displayed */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 opacity-50">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shirt className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">L001 - Cuci Kering</p>
                      <p className="text-sm text-gray-500">Reguler - Rp 7.000/kg</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">5 Customer</Badge>
                </div>
                <div className="ml-13 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowRight className="w-4 h-4" />
                    <Users className="w-4 h-4" />
                    <span>C001 - Budi Santoso</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowRight className="w-4 h-4" />
                    <Users className="w-4 h-4" />
                    <span>C002 - Ani Wijaya</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Relation Check */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Network className="w-5 h-5" />
          Cek Relasi Customer & Layanan
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Periksa apakah customer tertentu pernah menggunakan layanan tertentu
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="checkCustomer">ID Customer</Label>
            <Input id="checkCustomer" placeholder="Contoh: C001" />
          </div>
          <div>
            <Label htmlFor="checkService">Kode Layanan</Label>
            <Input id="checkService" placeholder="Contoh: L001" />
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Search className="w-4 h-4 mr-2" />
              Cek Relasi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
