import BikeDetailsForm from './BikeDetailsForm';

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-rapto-primary">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-rapto-highlight mb-8">Bike Owner Dashboard</h1>
        <div className="bg-white dark:bg-rapto-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bike Details</h2>
          <BikeDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;