import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  TrendingUp,
  Eye,
  MoreHorizontal
} from "lucide-react";

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    product: "Premium Headphones",
    amount: "$299.99",
    status: "completed",
    date: "2 hours ago"
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    product: "Wireless Mouse",
    amount: "$79.99",
    status: "pending",
    date: "4 hours ago"
  },
  {
    id: "#12347",
    customer: "Mike Johnson",
    product: "Gaming Keyboard",
    amount: "$159.99",
    status: "shipped",
    date: "6 hours ago"
  },
  {
    id: "#12348",
    customer: "Sarah Wilson",
    product: "Monitor Stand",
    amount: "$49.99",
    status: "completed",
    date: "8 hours ago"
  }
];

const topProducts = [
  { name: "Premium Headphones", sales: 234, revenue: "$69,966" },
  { name: "Wireless Mouse", sales: 189, revenue: "$15,111" },
  { name: "Gaming Keyboard", sales: 156, revenue: "$24,954" },
  { name: "Monitor Stand", sales: 98, revenue: "$4,899" }
];

export default function Dashboard() {
  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-success text-success-foreground",
      pending: "bg-warning text-warning-foreground", 
      shipped: "bg-accent text-accent-foreground"
    };
    return variants[status as keyof typeof variants] || "bg-muted";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <Button className="gradient-primary text-white shadow-medium">
            <TrendingUp className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1% from last month"
            icon={DollarSign}
            trend="up"
          />
          <StatsCard
            title="Total Orders"
            value="2,350"
            change="+15.3% from last month"
            icon={ShoppingCart}
            trend="up"
          />
          <StatsCard
            title="Products"
            value="1,234"
            change="+5.2% from last month"
            icon={Package}
            trend="up"
          />
          <StatsCard
            title="Active Users"
            value="573"
            change="+12.5% from last month"
            icon={Users}
            trend="up"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                You have {recentOrders.length} new orders today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg animate-slide-up">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt={order.customer} />
                        <AvatarFallback>{order.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusBadge(order.status)}>
                        {order.status}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{order.amount}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Best performing products this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}