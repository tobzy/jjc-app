import { useLocation } from 'react-router-dom';

export function useGetQueryParams(): any {
  const query: any = new URLSearchParams(useLocation().search);
  const obj = [...query.entries()].reduce((main, [key, value]) => ({ ...main, [key]: value }), {});
  return obj;
}
