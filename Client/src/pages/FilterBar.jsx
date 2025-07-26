// src/FilterBar.jsx
import React from "react";
import "./FilterBar.css";
const sortOptions = [
  { label: "Name (A → Z)", key: "name", direction: "asc" },
  { label: "Name (Z → A)", key: "name", direction: "desc" },
  { label: "Number (Low → High)", key: "number", direction: "asc" },
  { label: "Number (High → Low)", key: "number", direction: "desc" },
  { label: "Height (Low → High)", key: "height", direction: "asc" },
  { label: "Height (High → Low)", key: "height", direction: "desc" },
  { label: "Weight (Low → High)", key: "weight", direction: "asc" },
  { label: "Weight (High → Low)", key: "weight", direction: "desc" },
  { label: "Moves (Few → Many)", key: "movesCount", direction: "asc" },
  { label: "Moves (Many → Few)", key: "movesCount", direction: "desc" },
];

export default function FilterBar({
  filterNumber,
  setFilterNumber,
  filterName,
  setFilterName,
  filterType,
  setFilterType,
  filterGeneration,
  setFilterGeneration,
  filterMove,
  setFilterMove,
  uniqueTypes,
  uniqueGenerations,
  selectedSort,
  setSelectedSort,
  setSortConfig,
}) {
  return (
    <nav className="filter-bar">
      {/* Filter Inputs */}
      <input
        type="text"
        placeholder="Number"
        value={filterNumber}
        onChange={(e) => setFilterNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      {/* Filter Dropdowns */}
      <select
        value={uniqueTypes.includes(filterType) ? filterType : ""}
        onChange={(e) => setFilterType(e.target.value.trim())}
      >
        <option value="">All Types</option>
        {uniqueTypes.map((t) => (
          <option key={t} value={t.trim()}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={filterGeneration}
        onChange={(e) => setFilterGeneration(e.target.value.trim())}
      >
        <option value="">All Generations</option>
        {uniqueGenerations.map((g) => (
          <option key={g} value={g.trim()}>
            {g}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Move"
        value={filterMove}
        onChange={(e) => setFilterMove(e.target.value)}
      />

      {/* Sort Dropdown */}
      <select
        value={selectedSort || ""}
        onChange={(e) => {
          const selected = sortOptions.find(
            (opt) => opt.label === e.target.value
          );
          if (selected) {
            setSortConfig({ key: selected.key, direction: selected.direction });
            setSelectedSort(selected.label);
          }
        }}
      >
        <option value="">Sort by...</option>
        {sortOptions.map((opt) => (
          <option key={opt.label} value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
    </nav>
  );
}
