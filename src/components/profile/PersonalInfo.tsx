// src/components/profile/PersonalInfo.tsx

import InfoField from './InfoField';

interface User {
    name: string;
    email: string;
    phone: string;
    registrationDate: string;
}

interface PersonalInfoProps {
    user: User;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Información personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Nombre" value={user.name} isEditable />
                <InfoField label="Correo electrónico" value={user.email} />
                <InfoField label="Teléfono" value={user.phone} isEditable />
                <InfoField label="Fecha de registro" value={user.registrationDate} />
            </div>
        </div>
    );
}