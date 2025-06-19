/**
 * Formates date from 'yyyy-mm-ddThh:mm:ss.ms+utc' to 'hh:mm dd/mm/yyyy' in -3 utl.
 * @param isoString - The iso date.
 * @returns - The formatted date.
 */
export const formatDate = (isoString: string) =>  {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const datePart = date.toLocaleDateString('pt-BR');
  return `${time} ${datePart}`;
}
