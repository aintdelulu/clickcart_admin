import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$299.99",
    stock: 45,
    category: "Electronics",
    image: "/placeholder.svg",
    status: "active",
    sales: 234
  },
  {
    id: 2,
    name: "Ergonomic Wireless Mouse",
    price: "$79.99",
    stock: 128,
    category: "Electronics",
    image: "/placeholder.svg",
    status: "active",
    sales: 189
  },
  {
    id: 3,
    name: "Mechanical Gaming Keyboard",
    price: "$159.99",
    stock: 67,
    category: "Electronics",
    image: "/placeholder.svg",
    status: "active",
    sales: 156
  },
  {
    id: 4,
    name: "Adjustable Monitor Stand",
    price: "$49.99",
    stock: 0,
    category: "Accessories",
    image: "/placeholder.svg",
    status: "out_of_stock",
    sales: 98
  },
  {
    id: 5,
    name: "USB-C Hub 7-in-1",
    price: "$89.99",
    stock: 203,
    category: "Accessories",
    image: "/placeholder.svg",
    status: "active",
    sales: 145
  },
  {
    id: 6,
    name: "Blue Light Glasses",
    price: "$39.99",
    stock: 15,
    category: "Health",
    image: "/placeholder.svg",
    status: "low_stock",
    sales: 87
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (status === "low_stock" || stock < 20) {
      return <Badge className="bg-warning text-warning-foreground">Low Stock</Badge>;
    }
    return <Badge className="bg-success text-success-foreground">In Stock</Badge>;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and track performance.
            </p>
          </div>
          <Button className="gradient-primary text-white shadow-medium">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-muted/50">
                    <Package className="absolute inset-0 m-auto h-12 w-12 text-muted-foreground" />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.stock} units
                      </span>
                      {getStatusBadge(product.status, product.stock)}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {product.sales} sales this month
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{products.length}</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {products.filter(p => p.status === 'active' && p.stock > 20).length}
                </div>
                <div className="text-sm text-muted-foreground">In Stock</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {products.filter(p => p.stock > 0 && p.stock <= 20).length}
                </div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">
                  {products.filter(p => p.stock === 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}