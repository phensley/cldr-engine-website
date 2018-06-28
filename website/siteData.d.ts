export interface DocLink {
  doc: string;
  label: string;
}

export interface HrefLink {
  href: string;
  label: string;
}

export type HeaderLink = DocLink | HrefLink;

export const headerLinks: HeaderLink[];
