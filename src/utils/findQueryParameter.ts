export default function findQueryParameter(url: string, param: string): string {
  const pattern = new RegExp(`(?<=${param}=)(.*?)(?=&)`, 'g');

  const matchArr = url.match(pattern);
  if (matchArr?.length) {
    return matchArr[0];
  }

  return '';
}
