import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";

interface ProductDescriptionProps {
  description: string;
}

function ExpandableProductDescription({
  description,
}: ProductDescriptionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="mt-4">
      <Card key="description" className="mb-2">
        <CardContent
          className="p-4 cursor-pointer"
          onClick={() =>
            setExpandedSection((prev) =>
              prev === "description" ? null : "description"
            )
          }
        >
          <div className="font-semibold flex justify-between">
            <span>Description</span>
            <span>{expandedSection === "description" ? "-" : "+"}</span>
          </div>
          {expandedSection === "description" && (
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ExpandableProductDescription;
