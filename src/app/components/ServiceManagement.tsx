import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Shirt, Tag, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';

interface Layanan {
  kodeLayanan: string;
  jenisLayanan: 'Cuci Kering' | 'Cuci Setrika' | 'Setrika' | 'Express';
  kategori: 'Reguler' | 'Bed Cover' | 'Selimut' | 'Handuk';
  harga: number;
}

export function ServiceManagement() {
  const [services, setServices] = useState<Layanan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Layanan>({
    kodeLayanan: '',
    jenisLayanan: 'Cuci Kering',
    kategori: 'Reguler',
    harga: 0,
  });

  const handleAddService = () => {
    if (formData.kodeLayanan && formData.harga > 0) {
      setServices([...services, formData]);
      setFormData({
        kodeLayanan: '',
        jenisLayanan: 'Cuci Kering',
        kategori: 'Reguler',
        harga: 0,
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteService = (kode: string) => {
    setServices(services.filter((s) => s.kodeLayanan !== kode));
  };

  const filteredServices = services.filter(
    (s) =>
      s.kodeLayanan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.jenisLayanan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getServiceBadgeColor = (jenis: string) => {
    switch (jenis) {
      case 'Express':
        return 'bg-red-500 text-white';
      case 'Cuci Setrika':
        return 'bg-blue-500 text-white';
      case 'Cuci Kering':
        return 'bg-green-500 text-white';
      default:
        return 'bg-purple-500 text-white';
    }
  };

  const getCategoryBadgeColor = (kategori: string) => {
    switch (kategori) {
      case 'Bed Cover':
        return 'bg-orange-100 text-orange-700';
      case 'Selimut':
        return 'bg-blue-100 text-blue-700';
      case 'Handuk':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Layanan</h1>
          <p className="text-gray-500 mt-1">Kelola jenis layanan dan harga laundry</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Layanan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Layanan Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="kodeLayanan">Kode Layanan</Label>
                <Input
                  id="kodeLayanan"
                  placeholder="Contoh: L001"
                  value={formData.kodeLayanan}
                  onChange={(e) => setFormData({ ...formData, kodeLayanan: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenisLayanan">Jenis Layanan</Label>
                <select
                  id="jenisLayanan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.jenisLayanan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jenisLayanan: e.target.value as Layanan['jenisLayanan'],
                    })
                  }
                >
                  <option value="Cuci Kering">Cuci Kering</option>
                  <option value="Cuci Setrika">Cuci Setrika</option>
                  <option value="Setrika">Setrika</option>
                  <option value="Express">Express</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori Pakaian</Label>
                <select
                  id="kategori"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kategori: e.target.value as Layanan['kategori'],
                    })
                  }
                >
                  <option value="Reguler">Reguler</option>
                  <option value="Bed Cover">Bed Cover</option>
                  <option value="Selimut">Selimut</option>
                  <option value="Handuk">Handuk</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="harga">Harga (Rp)</Label>
                <Input
                  id="harga"
                  type="number"
                  placeholder="Contoh: 7000"
                  value={formData.harga || ''}
                  onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })}
                />
              </div>
              <Button onClick={handleAddService} className="w-full bg-green-600 hover:bg-green-700">
                Simpan Layanan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg border border-gray-200">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Cari layanan berdasarkan kode, jenis, atau kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0"
        />
      </div>

      {/* Service List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchQuery ? 'Tidak ada layanan yang sesuai pencarian' : 'Belum ada layanan'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                Tambah Layanan Pertama
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jenis Layanan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Harga per KG
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <tr key={service.kodeLayanan} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Shirt className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">{service.kodeLayanan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getServiceBadgeColor(service.jenisLayanan)}>
                        {service.jenisLayanan}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getCategoryBadgeColor(service.kategori)} variant="outline">
                        <Tag className="w-3 h-3 mr-1" />
                        {service.kategori}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-700 font-semibold">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        Rp {service.harga.toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(service.kodeLayanan)}
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
      {services.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Layanan</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{services.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Express</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {services.filter((s) => s.jenisLayanan === 'Express').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Harga Terendah</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {services.length > 0
                ? `Rp ${Math.min(...services.map((s) => s.harga)).toLocaleString('id-ID')}`
                : '-'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Harga Tertinggi</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {services.length > 0
                ? `Rp ${Math.max(...services.map((s) => s.harga)).toLocaleString('id-ID')}`
                : '-'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
