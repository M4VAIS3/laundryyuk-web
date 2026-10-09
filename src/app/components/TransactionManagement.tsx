import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Receipt, Calendar, Weight, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';

interface Transaksi {
  idTransaksi: string;
  idCustomer: string;
  kodeLayanan: string;
  tanggalMasuk: string;
  tanggalSelesai: string;
  berat: number;
  totalHarga: number;
  statusTransaksi: 'Proses' | 'Selesai' | 'Diambil';
}

export function TransactionManagement() {
  const [transactions, setTransactions] = useState<Transaksi[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaksi, 'totalHarga'>>({
    idTransaksi: '',
    idCustomer: '',
    kodeLayanan: '',
    tanggalMasuk: '',
    tanggalSelesai: '',
    berat: 0,
    statusTransaksi: 'Proses',
  });

  const handleAddTransaction = () => {
    if (formData.idTransaksi && formData.idCustomer && formData.kodeLayanan && formData.berat > 0) {
      // Mock calculation - in real app, this would use actual service price
      const totalHarga = formData.berat * 7000;
      setTransactions([
        ...transactions,
        {
          ...formData,
          totalHarga,
        },
      ]);
      setFormData({
        idTransaksi: '',
        idCustomer: '',
        kodeLayanan: '',
        tanggalMasuk: '',
        tanggalSelesai: '',
        berat: 0,
        statusTransaksi: 'Proses',
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.idTransaksi !== id));
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      t.idTransaksi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.idCustomer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.kodeLayanan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Diambil':
        return 'bg-green-500 text-white';
      case 'Selesai':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Transaksi</h1>
          <p className="text-gray-500 mt-1">Kelola transaksi dan relasi customer-layanan</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Transaksi
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Transaksi Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="idTransaksi">ID Transaksi</Label>
                <Input
                  id="idTransaksi"
                  placeholder="Contoh: T001"
                  value={formData.idTransaksi}
                  onChange={(e) => setFormData({ ...formData, idTransaksi: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idCustomer">ID Customer</Label>
                <Input
                  id="idCustomer"
                  placeholder="Contoh: C001"
                  value={formData.idCustomer}
                  onChange={(e) => setFormData({ ...formData, idCustomer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kodeLayanan">Kode Layanan</Label>
                <Input
                  id="kodeLayanan"
                  placeholder="Contoh: L001"
                  value={formData.kodeLayanan}
                  onChange={(e) => setFormData({ ...formData, kodeLayanan: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggalMasuk">Tanggal Masuk</Label>
                  <Input
                    id="tanggalMasuk"
                    type="date"
                    value={formData.tanggalMasuk}
                    onChange={(e) => setFormData({ ...formData, tanggalMasuk: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
                  <Input
                    id="tanggalSelesai"
                    type="date"
                    value={formData.tanggalSelesai}
                    onChange={(e) => setFormData({ ...formData, tanggalSelesai: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="berat">Berat (kg)</Label>
                <Input
                  id="berat"
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 5"
                  value={formData.berat || ''}
                  onChange={(e) => setFormData({ ...formData, berat: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusTransaksi">Status Transaksi</Label>
                <select
                  id="statusTransaksi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.statusTransaksi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      statusTransaksi: e.target.value as Transaksi['statusTransaksi'],
                    })
                  }
                >
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Diambil">Diambil</option>
                </select>
              </div>
              <Button onClick={handleAddTransaction} className="w-full bg-purple-600 hover:bg-purple-700">
                Simpan Transaksi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg border border-gray-200">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Cari transaksi berdasarkan ID transaksi, customer, atau layanan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0"
        />
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchQuery ? 'Tidak ada transaksi yang sesuai pencarian' : 'Belum ada transaksi'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4 bg-purple-600 hover:bg-purple-700"
              >
                Tambah Transaksi Pertama
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Transaksi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Layanan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Berat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.idTransaksi} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Receipt className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{transaction.idTransaksi}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {transaction.idCustomer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {transaction.kodeLayanan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-700 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{transaction.tanggalMasuk}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Weight className="w-4 h-4 text-gray-400" />
                        <span>{transaction.berat} kg</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-700 font-semibold">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        Rp {transaction.totalHarga.toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusBadgeColor(transaction.statusTransaksi)}>
                        {transaction.statusTransaksi}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTransaction(transaction.idTransaksi)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Transaksi</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{transactions.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Dalam Proses</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {transactions.filter((t) => t.statusTransaksi === 'Proses').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Selesai</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {transactions.filter((t) => t.statusTransaksi === 'Selesai').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Pendapatan</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              Rp {transactions.reduce((sum, t) => sum + t.totalHarga, 0).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
