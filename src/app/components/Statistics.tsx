import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Shirt, Search, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

export function Statistics() {
  const [customerIdForCount, setCustomerIdForCount] = useState('');
  const [serviceCodeForCount, setServiceCodeForCount] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Statistik & Analisis</h1>
        <p className="text-gray-500 mt-1">
          Pantau performa dan statistik bisnis laundry Anda
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <Badge className="bg-white/20 text-white border-0">Total</Badge>
          </div>
          <p className="text-sm opacity-80 mb-1">Customer Tanpa Transaksi</p>
          <p className="text-3xl font-bold">0</p>
          <p className="text-xs opacity-60 mt-2">Customer yang belum pernah bertransaksi</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Shirt className="w-8 h-8 opacity-80" />
            <Badge className="bg-white/20 text-white border-0">Total</Badge>
          </div>
          <p className="text-sm opacity-80 mb-1">Layanan Tanpa Customer</p>
          <p className="text-3xl font-bold">0</p>
          <p className="text-xs opacity-60 mt-2">Layanan yang belum pernah digunakan</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <Badge className="bg-white/20 text-white border-0">Aktif</Badge>
          </div>
          <p className="text-sm opacity-80 mb-1">Customer Aktif</p>
          <p className="text-3xl font-bold">0</p>
          <p className="text-xs opacity-60 mt-2">Customer yang pernah bertransaksi</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 opacity-80" />
            <Badge className="bg-white/20 text-white border-0">Populer</Badge>
          </div>
          <p className="text-sm opacity-80 mb-1">Layanan Populer</p>
          <p className="text-3xl font-bold">0</p>
          <p className="text-xs opacity-60 mt-2">Layanan yang paling banyak digunakan</p>
        </div>
      </div>

      {/* Transaction Count by Customer */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Hitung Jumlah Transaksi Customer
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Lihat berapa kali customer tertentu melakukan transaksi
        </p>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="customerCount">ID Customer</Label>
            <Input
              id="customerCount"
              placeholder="Contoh: C001"
              value={customerIdForCount}
              onChange={(e) => setCustomerIdForCount(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Hitung
            </Button>
          </div>
        </div>
        
        {/* Result placeholder */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">
            Masukkan ID Customer dan klik "Hitung" untuk melihat statistik
          </p>
        </div>
      </div>

      {/* Service Usage Count */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Shirt className="w-5 h-5 text-green-600" />
          Hitung Jumlah Pengguna Layanan
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Lihat berapa customer yang menggunakan layanan tertentu
        </p>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="serviceCount">Kode Layanan</Label>
            <Input
              id="serviceCount"
              placeholder="Contoh: L001"
              value={serviceCodeForCount}
              onChange={(e) => setServiceCodeForCount(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button className="bg-green-600 hover:bg-green-700">
              <Search className="w-4 h-4 mr-2" />
              Hitung
            </Button>
          </div>
        </div>
        
        {/* Result placeholder */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">
            Masukkan Kode Layanan dan klik "Hitung" untuk melihat statistik
          </p>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Active Customers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Customer Paling Aktif
          </h2>
          <div className="text-center py-8">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Belum ada data transaksi</p>
          </div>
        </div>

        {/* Most Popular Services */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            Layanan Paling Populer
          </h2>
          <div className="text-center py-8">
            <Shirt className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Belum ada data transaksi</p>
          </div>
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Statistik Pendapatan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 mb-2">Pendapatan Hari Ini</p>
            <p className="text-3xl font-bold text-blue-700">Rp 0</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 mb-2">Pendapatan Minggu Ini</p>
            <p className="text-3xl font-bold text-green-700">Rp 0</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 mb-2">Pendapatan Bulan Ini</p>
            <p className="text-3xl font-bold text-purple-700">Rp 0</p>
          </div>
        </div>
      </div>

      {/* Member Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Distribusi Status Member
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">Regular</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500">Silver</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500">Gold</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500">Platinum</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Informasi Statistik</h3>
            <p className="text-sm text-blue-700">
              Statistik akan diperbarui secara otomatis ketika ada perubahan data customer, layanan, atau transaksi. 
              Gunakan menu ini untuk memantau performa bisnis laundry Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
