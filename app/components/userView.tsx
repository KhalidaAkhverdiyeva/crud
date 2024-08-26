

import useSWR from 'swr';
import { fetcher } from '../http/fetcher';

interface ViewDetailsModalProps {
  userId: number;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ userId, onClose }) => {
  const { data: user, error } = useSWR<User>(`https://dummyjson.com/users/${userId}`, fetcher);

  if (error) return <p>Error loading user data.</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" style={{marginLeft:'0'}}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <div className="flex justify-center mb-4">
          <img
            src='/ava.webp' 
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <div className="space-y-2">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Department:</strong> {user.company.department}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Title:</strong> {user.company.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
