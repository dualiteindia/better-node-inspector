import React, { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

export default function ExpandableProperty({
  propertyName,
  children,
}: {
  propertyName: string;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        <div className=" border rounded bg-white bg-opacity-10">
          <div className="flex items-center justify-between p-2">
            <div>{propertyName}</div>
            {isExpanded ? <FaChevronDown /> : <FaGreaterThan />}
          </div>
          {isExpanded && (
            <div className="bg-white bg-opacity-25 m-2">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
