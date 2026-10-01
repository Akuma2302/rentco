import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockRentals } from "../data/mockData";
import { RentalCard } from "../components/RentalCard";
import { PageHeader } from "../components/PageHeader";

export function MyRentalsPage() {
  const [activeTab, setActiveTab] = useState("renting");

  const rentingItems = mockRentals.filter((r) => r.renterId === "1");
  const lendingItems = mockRentals.filter((r) => r.ownerId === "1");

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <PageHeader title="My Bookings" subtitle="Items you're renting and lending" />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-5 h-11 rounded-2xl bg-brand-sky p-1 w-auto">
          <TabsTrigger value="renting" className="flex-1 rounded-xl font-semibold data-[state=active]:text-brand-blue">
            Renting ({rentingItems.length})
          </TabsTrigger>
          <TabsTrigger value="lending" className="flex-1 rounded-xl font-semibold data-[state=active]:text-brand-blue">
            Lending ({lendingItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="renting" className="flex-1 overflow-y-auto p-4 mt-0">
          {rentingItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No active rentals</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rentingItems.map((rental) => (
                <RentalCard key={rental.id} rental={rental} type="renting" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="lending" className="flex-1 overflow-y-auto p-4 mt-0">
          {lendingItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items being lent</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lendingItems.map((rental) => (
                <RentalCard key={rental.id} rental={rental} type="lending" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}