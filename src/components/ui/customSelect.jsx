import { useState, useRef, useEffect } from "react"

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full rounded-lg px-4 py-3 bg- text-left text-advanced flex items-center justify-between ring-2 ring-advanced"
      >
        <span className="truncate">
          {selectedOption?.label || placeholder}
        </span>
        <span className="text-advanced">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 w-full max-h-64 overflow-auto rounded-lg bg-white shadow-lg">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-secondary text-advanced 
                ${value === option.value ? "bg-red-50 font-medium" : ""}
              `}
            >
              <span className="block break-words">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
