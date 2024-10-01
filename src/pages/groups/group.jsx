// src/pages/group.jsx
import { useParams } from 'react-router-dom';
import { cardData } from '@/lib/data';

const Group = () => {
  const { groupId } = useParams();

  const group = cardData.find((g) => g.id === parseInt(groupId));

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-background shadow-md rounded-lg p-6 border border-border">
        <h1 className="text-2xl font-bold mb-2">{group.title}</h1>
        <p className="text-gray-700 mb-4">Time: {group.time}</p>
        <p className="text-gray-700 mb-4">Days: {group.days}</p>
        <p className="text-gray-700 mb-4">Code: {group.code}</p>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold">
            Students: {group.students}
          </h2>
          <div className="flex items-center ml-2">
            {group.avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar.src}
                alt={avatar.alt}
                className="h-8 w-8 rounded-full border-2 border-white -ml-2"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <img
              src={group.teacher.avatar}
              alt={group.teacher.name}
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <span className="ml-2 font-medium">{group.teacher.name}</span>
          </div>
          <small className="text-sm text-gray-500">{group.date}</small>
        </div>
      </div>
    </div>
  );
};

export default Group;
