import React from "react";
export default function StickyWhatsApp({ onClick, href, label="WhatsApp" }:{
  href: string; label?: string; onClick?: () => void;
}) {
  return (
    <a className="waFloat" href={href} target="_blank" rel="noreferrer" onClick={onClick}>
      <span className="waDot" aria-hidden="true" />
      {label}
    </a>
  );
}
