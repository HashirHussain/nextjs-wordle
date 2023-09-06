const alertStyle = `bg-gray-50 border-slate-100 border-2 text-gray-800 drop-shadow-2xl px-8 py-6 rounded absolute`;

export default function Alert(props: { children: any; }) {
    return (
        <>
            <div className="absolute h-screen w-full bg-slate-50 opacity-50 drop-shadow-2xl"></div>
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline font-semibold">{props.children}</span>
            </div>
        </>
    );
}
