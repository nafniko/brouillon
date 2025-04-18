export function Checkbox({ label, checked, onChange,id }) {
  return (
    <div className="flex items-center mb-4 form-check" htmlFor={id}>
      <label className="form-check-label">
        <input
            id={id}
            className=" form-check-input border-2 border-gray-300 rounded-md p-2 w-full"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    </div>
  );
}