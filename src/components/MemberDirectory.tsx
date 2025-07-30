import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Phone, Mail, MapPin, User, Users } from "lucide-react";
import { database, ref, onValue, off } from '@/lib/firebase';
import MapModal from './MapModal';

interface Member {
  Id: string;
  Name: string;
  email: string;
  phone: string;
  Address: string;
  map?: string;
  family?: string[];
}

const MemberDirectory = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch members from Firebase
  useEffect(() => {
    const membersRef = ref(database, 'Directory-VNHBC/listing');
    
    const unsubscribe = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const membersArray = Object.keys(data).map(key => ({
          Id: key,
          ...data[key]
        }));
        setMembers(membersArray);
      } else {
        setMembers([]);
      }
      setLoading(false);
    });

    return () => off(membersRef, 'value', unsubscribe);
  }, []);

  // Filter members based on search and filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === "" || 
      member.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = stateFilter === "" || member.Address.toLowerCase().includes(stateFilter.toLowerCase());
    const matchesCity = cityFilter === "" || member.Address.toLowerCase().includes(cityFilter.toLowerCase());

    return matchesSearch && matchesState && matchesCity;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStateFilter("");
    setCityFilter("");
  };

  const handleCardClick = (member: Member) => {
    setSelectedMember(member);
    setIsMapModalOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* Search and Filters */}
      <Card className="shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters:</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">CA</SelectItem>
                <SelectItem value="TX">TX</SelectItem>
                <SelectItem value="NY">NY</SelectItem>
                <SelectItem value="FL">FL</SelectItem>
                <SelectItem value="LA">LA</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by City"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />

            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {loading ? "Loading..." : `Showing ${filteredMembers.length} of ${members.length} members`}
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading members from Firebase...</p>
        </div>
      ) : (
        /* Member Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card 
              key={member.Id} 
              className="hover:shadow-elegant transition-all duration-300 animate-fade-in cursor-pointer"
              onClick={() => handleCardClick(member)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary">
                        {member.Name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-3" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-3" />
                    <span className="text-sm">{member.phone}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span className="text-sm">{member.Address}</span>
                  </div>
                  
                  {member.family && member.family.length > 0 && (
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-3" />
                      <span className="text-sm">Family: {member.family.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-primary font-medium">
                    Click to view map location
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredMembers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No members found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Map Modal */}
      {selectedMember && (
        <MapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          address={selectedMember.Address}
          memberName={selectedMember.Name}
        />
      )}
    </div>
  );
};

export default MemberDirectory;