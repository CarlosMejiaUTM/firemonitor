interface AlertItemProps {
    type: 'flame' | 'temp' | 'smoke';
    reportedBy: string;
    distance: string;
    time: string;
}

const alertConfig = {
    flame: { title: 'Flama detectada', color: 'bg-red-500' },
    temp: { title: 'Temperatura elevada', color: 'bg-orange-500' },
    smoke: { title: 'Humo detectado', color: 'bg-yellow-400' },
};


function AlertItem({ type, reportedBy, distance, time }: AlertItemProps) {
    const config = alertConfig[type];

    return (
        <div className="flex items-start space-x-4">
            <div className={`w-1.5 h-12 ${config.color} rounded-full mt-1`}></div>
            <div className="flex-1 flex justify-between items-start">
                <div>
                    <p className="font-bold">{config.title}</p>
                    <p className="text-sm text-gray-500">Reportado por: {reportedBy}</p>
                    <p className="text-sm text-gray-500">Distancia: {distance}</p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap">{time}</p>
            </div>
        </div>
    );
}

export default AlertItem;