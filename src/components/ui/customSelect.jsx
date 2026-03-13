import { useState, useRef, useEffect } from "react"

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div
      ref={ref}
      className={`relative ${open ? "z-40" : "z-10"}`}
    >
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="w-full rounded-lg px-4 py-3 bg-secondary text-left flex items-center justify-between ring-2 ring-advanced"
      >
        <span className="text-advanced truncate">
          {selectedOption?.label || placeholder}
        </span>

        <span className="text-advanced">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full max-h-64 overflow-auto rounded-lg bg-white shadow-lg z-50">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-secondary text-advanced
              ${value === option.value ? "bg-red-50 font-medium" : ""}`}
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