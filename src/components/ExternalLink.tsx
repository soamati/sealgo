import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  href: string;
}>;

const ExternalLink = ({ children, href }: Props) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
