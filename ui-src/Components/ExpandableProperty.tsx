import React, { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

export default function ExpandableProperty({
  propertyName,
  children,
  loadChildren,
}: {
  propertyName: string;
  children: React.ReactNode;
  loadChildren?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-2.5 mx-6">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        <div className=" border rounded bg-white bg-opacity-10">
          <div
            className="flex items-center justify-between p-2"
            {...(propertyName === "Children" && {
              onClick: (evt) => {
                loadChildren && loadChildren();
              },
            })}
          >
            <div>{propertyName}</div>
            {isExpanded ? <FaChevronDown /> : <FaGreaterThan />}
          </div>
          <div>
            {isExpanded && (
              <pre className="bg-white bg-opacity-20 m-2.5 p-1 overflow-auto overflow-y-auto text-xs">
                {children}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
