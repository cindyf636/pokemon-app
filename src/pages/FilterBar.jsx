// src/FilterBar.jsx
import React from "react";
import "./FilterBar.css";

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
}) {
  return (
    <nav className="filter-bar">
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
    </nav>
  );
}
