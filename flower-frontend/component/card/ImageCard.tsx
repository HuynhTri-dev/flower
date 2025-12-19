interface ImageCardProps {
    image: string;
    title?: string;
    width?: number;
    height?: number;
    onClick?: () => void;
}

export const ImageCard = ({ image, title, width, height, onClick }: ImageCardProps) => {
    const isCustomSize = width || height;

    return (
        <div
            className={`flex flex-col items-center justify-center group ${onClick ? 'cursor-pointer' : ''} ${isCustomSize ? 'w-fit' : 'h-full'}`}
            onClick={onClick}
        >
            <div className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${isCustomSize ? 'w-fit' : 'w-full h-full'}`}>
                <img
                    src={image}
                    alt={title}
                    width={width}
                    height={height}
                    className={`object-cover ${isCustomSize ? '' : 'w-full h-full'}`}
                    style={isCustomSize ? { width: width ? width : 'auto', height: height ? height : 'auto' } : undefined}
                />

                {/* Glossy Glass Effect Layers */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-white/20 via-white/5 to-transparent opacity-100" />
                <div className="absolute inset-0 z-10 pointer-events-none ring-1 ring-inset ring-white/20 rounded-2xl" />
                <div className="absolute top-0 inset-x-0 h-1/2 z-10 bg-gradient-to-b from-white/10 to-transparent opacity-60 pointer-events-none" />
            </div>

            {title && (
                <h2 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                </h2>
            )}
        </div>
    );
};