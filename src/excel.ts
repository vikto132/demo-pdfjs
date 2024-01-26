import * as XLSX from 'xlsx';

export async function readExcelFile() {
  const response = await fetch('assets/excel.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });

  // Get first worksheet
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
   // Log merged cells
   if (worksheet['!merges']) {
     console.log(worksheet['!merges'])
  }
  // Convert worksheet to JSON
  return XLSX.utils.sheet_to_html(worksheet)
}