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
  Plus,
  Shield,
  User,
  Crown,
  Mail,
  Calendar
} from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    status: "active",
    orders: 12,
    totalSpent: "$2,459.00",
    joinDate: "2023-05-15",
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    status: "active",
    orders: 8,
    totalSpent: "$1,230.00",
    joinDate: "2023-07-22",
    lastActive: "1 day ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "admin",
    status: "active",
    orders: 0,
    totalSpent: "$0.00",
    joinDate: "2023-01-10",
    lastActive: "5 minutes ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "customer",
    status: "inactive",
    orders: 3,
    totalSpent: "$450.00",
    joinDate: "2023-09-12",
    lastActive: "2 weeks ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    role: "moderator",
    status: "active",
    orders: 5,
    totalSpent: "$890.00",
    joinDate: "2023-03-08",
    lastActive: "3 hours ago",
    avatar: "/placeholder.svg"
  }
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { 
        className: "bg-destructive text-destructive-foreground", 
        icon: Crown 
      },
      moderator: { 
        className: "bg-primary text-primary-foreground", 
        icon: Shield 
      },
      customer: { 
        className: "bg-secondary text-secondary-foreground", 
        icon: User 
      }
    };

    const { className, icon: Icon } = config[role as keyof typeof config];
    
    return (
      <Badge className={className}>
        <Icon className="mr-1 h-3 w-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="outline">Inactive</Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleCounts = {
    all: users.length,
    admin: users.filter(u => u.role === "admin").length,
    moderator: users.filter(u => u.role === "moderator").length,
    customer: users.filter(u => u.role === "customer").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage user accounts and permissions.
            </p>
          </div>
          <Button className="gradient-primary text-white shadow-medium">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Role Filter Tabs */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(roleCounts).map(([role, count]) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter(role)}
                  className={roleFilter === role ? "gradient-primary text-white" : ""}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} ({count})
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
                  placeholder="Search users..."
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

        {/* Users List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Showing {filteredUsers.length} of {users.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium">{user.name}</p>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Joined {user.joinDate}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last active: {user.lastActive}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right space-y-1">
                      <p className="font-semibold">{user.totalSpent}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.orders} order{user.orders !== 1 ? 's' : ''}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
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
                <div className="text-2xl font-bold text-primary">{users.length}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {users.filter(u => u.status === "active").length}
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{roleCounts.customer}</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {roleCounts.admin + roleCounts.moderator}
                </div>
                <div className="text-sm text-muted-foreground">Staff</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}