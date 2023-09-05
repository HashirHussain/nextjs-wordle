const alertStyle = `bg-gray-50 border-slate-100 border-2 text-gray-800 drop-shadow-2xl px-4 py-3 rounded absolute`;

export default function Alert({ message }: { message: string }) {
    return (
        <div className={`${alertStyle}`} role="alert">
            <span className="block sm:inline font-semibold">{message}</span>
        </div>
    );
}
