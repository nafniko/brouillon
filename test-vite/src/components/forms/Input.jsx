/**
 * @param {string} type - Le type du champ de saisie (par exemple, texte, mot de passe, email).
 * @param {string} label - L'étiquette pour le champ de saisie.
 * @param {string} placeholder - Le texte d'indication pour le champ de saisie.
 * @param {string} value - La valeur actuelle du champ de saisie.
 * @param {function} onChange - La fonction à appeler lorsque la valeur du champ change.
 */


export function Input({ type = 'text', label, placeholder, value, onChange }) {
  return (
    <div>
      <label>
        {label}
        <input
            className="border-2 rounded-4 border-gray-300 rounded-md p-2 w-full"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}