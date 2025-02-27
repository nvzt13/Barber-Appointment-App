import React from 'react';

interface Barber {
  id: string;
  name: string;
  image: string;
}

interface BarberSelectionProps {
  barbers: Barber[];
  formData: { barberId: string };
  setFormData: React.Dispatch<React.SetStateAction<{ barberId: string }>>;
}

const BarberSelection: React.FC<BarberSelectionProps> = ({ barbers, formData, setFormData }) => {
  const handleBarberSelect = (barberId: string) => {
    setFormData({ ...formData, barberId });
  };

  return (
    <div className="flex flex-col space-y-4">
      {barbers?.map((barber) => (
        <div
          key={barber.id}
          className={`flex items-center space-x-4 p-4 border rounded-md cursor-pointer ${
            formData.barberId === barber.id ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => handleBarberSelect(barber.id)}
        >
          <img src={barber.image} alt={barber.name} className="w-16 h-16 rounded-full object-cover" />
          <span className="text-lg font-medium">{barber.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BarberSelection;
