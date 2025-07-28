import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "#ORD-12345",
    customer: "John Doe",
    email: "john@example.com",
    products: ["Premium Headphones", "Wireless Mouse"],
    total: "$379.98",
    status: "shipped",
    date: "2024-01-15",
    avatar: "/placeholder.svg"
  },
  {
    id: "#ORD-12346",
    customer: "Jane Smith",
    email: "jane@example.com",
    products: ["Gaming Keyboard"],
    total: "$159.99",
    status: "pending",
    date: "2024-01-14",
    avatar: "/placeholder.svg"
  },
  {
    id: "#ORD-12347",
    customer: "Mike Johnson",
    email: "mike@example.com",
    products: ["Monitor Stand", "USB-C Hub"],
    total: "$139.98",
    status: "completed",
    date: "2024-01-13",
    avatar: "/placeholder.svg"
  },
  {
    id: "#ORD-12348",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    products: ["Blue Light Glasses"],
    total: "$39.99",
    status: "cancelled",
    date: "2024-01-12",
    avatar: "/placeholder.svg"
  },
  {
    id: "#ORD-12349",
    customer: "Tom Brown",
    email: "tom@example.com",
    products: ["Premium Headphones", "Gaming Keyboard", "Wireless Mouse"],
    total: "$539.97",
    status: "processing",
    date: "2024-01-11",
    avatar: "/placeholder.svg"
  }
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { 
        className: "bg-warning text-warning-foreground", 
        icon: Clock 
      },
      processing: { 
        className: "bg-accent text-accent-foreground", 
        icon: Package 
      },
      shipped: { 
        className: "bg-primary text-primary-foreground", 
        icon: Truck 
      },
      completed: { 
        className: "bg-success text-success-foreground", 
        icon: CheckCircle 
      },
      cancelled: { 
        className: "bg-destructive text-destructive-foreground", 
        icon: XCircle 
      }
    };

    const { className, icon: Icon } = config[status as keyof typeof config];
    
    return (
      <Badge className={className}>
        <Icon className="mr-1 h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Track and manage all your customer orders.
            </p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "gradient-primary text-white" : ""}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>
              Showing {filteredOrders.length} of {orders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={order.avatar} alt={order.customer} />
                      <AvatarFallback>
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium">{order.customer}</p>
                        <span className="text-sm text-muted-foreground">{order.id}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                      <div className="text-sm text-muted-foreground">
                        {order.products.length} item{order.products.length !== 1 ? 's' : ''}: {order.products.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-semibold text-lg">{order.total}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{orders.length}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{statusCounts.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{statusCounts.pending + statusCounts.processing}</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{statusCounts.cancelled}</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}