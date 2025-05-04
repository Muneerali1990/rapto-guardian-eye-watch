import { useState } from 'react';
import { Button } from '@/components/ui/button';

const BikeDetailsForm = () => {
  const [bikeDetails, setBikeDetails] = useState({
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    insurancePolicyNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API integration here
    console.log('Bike details submitted:', bikeDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Bike Model</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md dark:bg-rapto-primary"
            value={bikeDetails.model}
            onChange={(e) => setBikeDetails({...bikeDetails, model: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Manufacturing Year</label>
          <input
            type="number"
            required
            min="1900"
            max={new Date().getFullYear()}
            className="w-full p-2 border rounded-md dark:bg-rapto-primary"
            value={bikeDetails.year}
            onChange={(e) => setBikeDetails({...bikeDetails, year: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">VIN Number</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md dark:bg-rapto-primary"
            value={bikeDetails.vin}
            onChange={(e) => setBikeDetails({...bikeDetails, vin: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">License Plate</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md dark:bg-rapto-primary"
            value={bikeDetails.licensePlate}
            onChange={(e) => setBikeDetails({...bikeDetails, licensePlate: e.target.value})}
          />
        </div>
      </div>

      <Button 
        type="submit"
        className="mt-4 bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white hover:shadow-glow"
      >
        Save Bike Details
      </Button>
    </form>
  );
};

export default BikeDetailsForm;