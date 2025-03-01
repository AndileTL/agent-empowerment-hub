
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Agent = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Agent Management</h1>
      
      <Card className="p-6">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Agents</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Agents</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Technical Support</TableCell>
                  <TableCell>Team Alpha</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <p>No inactive agents found.</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Agent;
