import React from 'react';
import { Users, Shirt, Receipt, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import type { MenuItem } from '../App';

interface DashboardProps {
  onNavigate: (menu: MenuItem) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: 'Total Customer',
      value: '0',
      icon: Users,
      color: 'bg-blue-500',
      onClick: () => onNavigate('customers'),
    },
    {
      title: 'Total Layanan',
      value: '0',
      icon: Shirt,
      color: 'bg-green-500',
      onClick: () => onNavigate('services'),
    },
    {
      title: 'Total Transaksi',
      value: '0',
      icon: Receipt,
      color: 'bg-purple-500',
      onClick: () => onNavigate('transactions'),
    },
    {
      title: 'Transaksi Hari Ini',
      value: '0',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentTransactions = [
    // Placeholder for recent transactions
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang di LaundrYuk!</h1>
        <p className="text-blue-100">
          Kelola customer, layanan, dan transaksi laundry Anda dengan sistem yang praktis dan efisien
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={stat.onClick}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
                stat.onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('customers')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Tambah Customer Baru</span>
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
            >
              <Shirt className="w-5 h-5" />
              <span>Tambah Layanan Baru</span>
            </button>
            <button
              onClick={() => onNavigate('transactions')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
            >
              <Receipt className="w-5 h-5" />
              <span>Buat Transaksi Baru</span>
            </button>
          </div>
        </div>

        {/* Transaction Status Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Transaksi</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">Dalam Proses</span>
              </div>
              <span className="font-semibold text-gray-800">0</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Selesai</span>
              </div>
              <span className="font-semibold text-gray-800">0</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Sudah Diambil</span>
              </div>
              <span className="font-semibold text-gray-800">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaksi Terbaru</h2>
        {recentTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Belum ada transaksi</p>
            <button
              onClick={() => onNavigate('transactions')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buat Transaksi Pertama
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Transactions will be listed here */}
          </div>
        )}
      </div>
    </div>
  );
}
