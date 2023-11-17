import * as XLSX from 'xlsx';
import { useCallback } from 'react';

const useExcelExport = () => {
  const exportToExcel = useCallback((data, fileName, headers) => {
    // Transformar los datos a un formato adecuado para la hoja de Excel
    const ws = XLSX.utils.json_to_sheet(data, { header: Object.keys(headers), skipHeader: true });

    // Añadir los encabezados con negrita pero no funciona jeje
    XLSX.utils.sheet_add_aoa(ws, [Object.values(headers)], { origin: 'A1' });
    
    // Obtener todas las claves (keys) de los objetos de datos para determinar el ancho de las columnas
    const colsWidth = Object.keys(headers).map(key => ({
      wch: Math.max(...data.map(row => (row[key] ? row[key].toString().length : 0)), key.length) // Ajustar el tamaño de la columna al contenido más largo
    }));

    ws['!cols'] = colsWidth;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Establecer los encabezados como negrita
    const range = XLSX.utils.decode_range(ws['!ref']); 
    for(let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1"; 
      if(!ws[address]) continue; 
      ws[address].s = { 
        font: { bold: true }
      };
    }

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }, []);

  return exportToExcel;
};

export default useExcelExport;
