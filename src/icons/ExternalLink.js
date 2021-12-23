import React from "react";

export default function ExternalLink(props) {
  return (
    <svg
      className={props.className}
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5931 0.988604C1.27545 0.988604 0.970805 1.11479 0.746189 1.33941C0.521574 1.56402 0.395386 1.86867 0.395386 2.18632V12.9658C0.395386 13.2834 0.521574 13.5881 0.746189 13.8127C0.970805 14.0373 1.27545 14.1635 1.5931 14.1635H12.3726C12.6902 14.1635 12.9949 14.0373 13.2195 13.8127C13.4441 13.5881 13.5703 13.2834 13.5703 12.9658V8.77378C13.5703 8.61495 13.5072 8.46263 13.3949 8.35032C13.2826 8.23801 13.1303 8.17492 12.9714 8.17492C12.8126 8.17492 12.6603 8.23801 12.548 8.35032C12.4357 8.46263 12.3726 8.61495 12.3726 8.77378V12.9658H1.5931V2.18632H5.78512C5.94395 2.18632 6.09627 2.12323 6.20858 2.01092C6.32089 1.89861 6.38398 1.74629 6.38398 1.58746C6.38398 1.42864 6.32089 1.27631 6.20858 1.16401C6.09627 1.0517 5.94395 0.988604 5.78512 0.988604H1.5931ZM13.3954 1.16347C13.5068 1.27512 13.5696 1.42618 13.5703 1.58387V5.18062C13.5703 5.33945 13.5072 5.49177 13.3949 5.60408C13.2826 5.71638 13.1303 5.77948 12.9714 5.77948C12.8126 5.77948 12.6603 5.71638 12.548 5.60408C12.4357 5.49177 12.3726 5.33945 12.3726 5.18062V3.03311L6.20911 9.19777C6.15343 9.25345 6.08733 9.29762 6.01458 9.32775C5.94183 9.35788 5.86386 9.37339 5.78512 9.37339C5.70638 9.37339 5.62841 9.35788 5.55566 9.32775C5.48291 9.29762 5.41681 9.25345 5.36113 9.19777C5.30545 9.14209 5.26128 9.07599 5.23115 9.00324C5.20101 8.93049 5.1855 8.85252 5.1855 8.77378C5.1855 8.69503 5.20101 8.61706 5.23115 8.54431C5.26128 8.47156 5.30545 8.40546 5.36113 8.34978L11.5258 2.18632H9.37828C9.21945 2.18632 9.06713 2.12323 8.95482 2.01092C8.84251 1.89861 8.77942 1.74629 8.77942 1.58746C8.77942 1.42864 8.84251 1.27631 8.95482 1.16401C9.06713 1.0517 9.21945 0.988604 9.37828 0.988604H12.9714C13.0501 0.988398 13.1281 1.00374 13.2009 1.03375C13.2736 1.06376 13.3397 1.10784 13.3954 1.16347Z"
        fill="var(--colText)"
      />
    </svg>
  );
}
