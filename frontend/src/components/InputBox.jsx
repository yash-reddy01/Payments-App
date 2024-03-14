export const InputBox = ({label, placeholder, onChange}) => {
    return <div className="">
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type="text" onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}