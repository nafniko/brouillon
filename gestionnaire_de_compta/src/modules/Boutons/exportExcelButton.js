// src/modules/exportExcelButton.js

export function createExportExcelButton(data, fileName = 'export.xlsx', label = 'Télécharger en Excel') {
    const button = document.createElement('button')
    button.textContent = label
    button.className = 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
  
    button.addEventListener('click', () => {
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1')
      XLSX.writeFile(workbook, fileName)
    })
  
    return button
  }
  