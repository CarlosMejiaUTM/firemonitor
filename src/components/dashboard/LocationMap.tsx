function LocationMap() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold mb-4">Ubicación del nodo</h2>
            <div className="relative bg-blue-50 aspect-video rounded-lg p-4 flex items-center justify-center overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gray-300"></div>
                <div className="absolute top-0 left-2/4 w-px h-full bg-gray-300"></div>
                <div className="absolute top-0 left-3/4 w-px h-full bg-gray-300"></div>
                <div className="absolute left-0 top-1/4 h-px w-full bg-gray-300"></div>
                <div className="absolute left-0 top-2/4 h-px w-full bg-gray-300"></div>
                <div className="absolute left-0 top-3/4 h-px w-full bg-gray-300"></div>

                {/* Nodes */}
                <div className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                <div className="absolute w-8 h-8 bg-green-500 opacity-70 rounded-full" style={{ top: '65%', left: '65%' }}></div>
                <div className="absolute w-6 h-6 bg-green-500 opacity-70 rounded-full" style={{ top: '20%', left: '75%' }}></div>
                <div className="absolute w-5 h-5 bg-green-500 opacity-70 rounded-full" style={{ top: '25%', left: '25%' }}></div>

                 {/* Coordinates */}
                 <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/70 px-2 py-1 rounded">
                    Lat: 20.9756, Lng: -89.6201
                </div>
            </div>
        </div>
    );
}

export default LocationMap;