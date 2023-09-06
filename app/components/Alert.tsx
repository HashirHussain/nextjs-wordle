const alertStyle = `absolute rounded px-8 py-6 bg-gray-50 border-slate-100 border-2 text-gray-800 drop-shadow-2xl`;

export default function Alert(props: { children: any }) {
    return (
        <>
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline font-semibold">{props.children}</span>
            </div>
        </>
    );
}
