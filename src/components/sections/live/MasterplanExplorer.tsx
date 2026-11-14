"use client";

import { useState } from "react";
import type { DirectoryItem, MapPlace } from "@/types/content";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { PlacesMap } from "@/components/map/PlacesMap";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

type Category = "all" | "residential" | "commercial" | "facilities";

type MasterplanExplorerProps = {
  places: (MapPlace & { category: Exclude<Category, "all"> })[];
  details: DirectoryItem[];
  view: { lat: number; lng: number; zoom: number };
};

/** Category-filtered map of the masterplan; pins open their detail drawer. */
export function MasterplanExplorer({ places, details, view }: MasterplanExplorerProps) {
  const [category, setCategory] = useState<Category>("all");
  const [open, setOpen] = useState<number | null>(null);
  const visible =
    category === "all" ? places : places.filter((place) => place.category === category);

  return (
    <div className="relative">
      <PlacesMap
        key={category}
        places={visible}
        view={view}
        label="Somabay masterplan map"
        onSelect={(id) => {
          const index = details.findIndex((item) => item.id === id);
          if (index >= 0) setOpen(index);
        }}
        className="aspect-[4/5] rounded-md sm:aspect-[1312/700]"
      />
      <div className="absolute top-4 left-4 z-[500] max-w-[calc(100%-2rem)] rounded-full bg-white/95 shadow-soft">
        <SegmentedControl
          label="Masterplan category"
          value={category}
          onChange={setCategory}
          options={[
            { id: "all", label: "All" },
            { id: "residential", label: "Residential" },
            { id: "commercial", label: "Commercial" },
            { id: "facilities", label: "Facilities" },
          ]}
        />
      </div>
      <DetailDrawer
        items={details}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </div>
  );
}
