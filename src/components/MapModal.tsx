import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  memberName: string;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, address, memberName }) => {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA6_ZM5h5ZXvHxccoMt3g0mY3iKvGLIVac&q=${encodedAddress}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Location for {memberName}</DialogTitle>
          <DialogDescription>
            View the map location for this member's address
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-96">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map for ${memberName}`}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p><strong>Address:</strong> {address}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;