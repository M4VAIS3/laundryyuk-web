import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, User, Phone, MapPin, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';

interface Customer {
  idCust: string;
  namaCust: string;
  noTelp: string;
  alamat: string;
  statusMember: 'Regular' | 'Silver' | 'Gold' | 'Platinum';
}

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Customer>({
    idCust: '',
    namaCust: '',
    noTelp: '',
    alamat: '',
    statusMember: 'Regular',
  });

  const handleAddCustomer = () => {
    if (formData.idCust && formData.namaCust) {
      setCustomers([...customers, formData]);
      setFormData({
        idCust: '',
        namaCust: '',
        noTelp: '',
        alamat: '',
        statusMember: 'Regular',
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.idCust !== id));
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.idCust.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.namaCust.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.noTelp.includes(searchQuery)
  );

  const getMemberBadgeColor = (status: string) => {
    switch (status) {
      case 'Platinum':
        return 'bg-slate-700 text-white';
      case 'Gold':
        return 'bg-yellow-500 text-white';
      case 'Silver':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Customer</h1>
          <p className="text-gray-500 mt-1">Kelola data customer laundry Anda</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Customer Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="idCust">ID Customer</Label>
                <Input
                  id="idCust"
                  placeholder="Contoh: C001"
                  value={formData.idCust}
                  onChange={(e) => setFormData({ ...formData, idCust: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="namaCust">Nama Customer</Label>
                <Input
                  id="namaCust"
                  placeholder="Masukkan nama customer"
                  value={formData.namaCust}
                  onChange={(e) => setFormData({ ...formData, namaCust: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noTelp">No. Telepon</Label>
                <Input
                  id="noTelp"
                  placeholder="Contoh: 08123456789"
                  value={formData.noTelp}
                  onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input
                  id="alamat"
                  placeholder="Masukkan alamat customer"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusMember">Status Member</Label>
                <select
                  id="statusMember"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.statusMember}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      statusMember: e.target.value as Customer['statusMember'],
                    })
                  }
                >
                  <option value="Regular">Regular</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
              <Button onClick={handleAddCustomer} className="w-full bg-blue-600 hover:bg-blue-700">
                Simpan Customer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg border border-gray-200">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Cari customer berdasarkan ID, nama, atau nomor telepon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0"
        />
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchQuery ? 'Tidak ada customer yang sesuai pencarian' : 'Belum ada customer'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Tambah Customer Pertama
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    No. Telepon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Alamat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.idCust} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{customer.idCust}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {customer.namaCust}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {customer.noTelp}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="max-w-xs truncate">{customer.alamat}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getMemberBadgeColor(customer.statusMember)}>
                        <Award className="w-3 h-3 mr-1" />
                        {customer.statusMember}
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
                          onClick={() => handleDeleteCustomer(customer.idCust)}
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
      {customers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Customer</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{customers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Regular</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {customers.filter((c) => c.statusMember === 'Regular').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Silver</p>
            <p className="text-2xl font-bold text-gray-500 mt-1">
              {customers.filter((c) => c.statusMember === 'Silver').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Gold & Platinum</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {customers.filter((c) => c.statusMember === 'Gold' || c.statusMember === 'Platinum').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
