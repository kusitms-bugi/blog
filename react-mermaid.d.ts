// react-mermaid.d.ts
declare module 'react-mermaid' {
  import { ReactElement } from 'react';
  export const Mermaid: (props: { chart: string }) => ReactElement;
}