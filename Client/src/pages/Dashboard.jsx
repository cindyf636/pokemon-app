import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import FilterBar from "./FilterBar";

export default function Dashboard() {
  // State variables
  const [summary, setSummary] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const [selectedSort, setSelectedSort] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter states
  const [filterNumber, setFilterNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGeneration, setFilterGeneration] = useState("");
  const [filterMove, setFilterMove] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5210/api/summary").then((res) => {
      setSummary(res.data);
    });

    // Load all Pokémon for filtering
    axios
      .get("http://localhost:5210/api/pokemon?page=1&pageSize=1000")
      .then((res) => {
        setAllPokemon(res.data);
      });
  }, []);

  useEffect(() => {
    let filteredResults = allPokemon.filter((p) => {
      const matchesNumber = p.number.toString().includes(filterNumber.trim());
      const matchesName = p.name
        .toLowerCase()
        .includes(filterName.toLowerCase().trim());
      const matchesType =
        !filterType || [p.type1, p.type2].includes(filterType);
      const matchesGen = !filterGeneration || p.generation === filterGeneration;
      const matchesMove =
        !filterMove ||
        p.moves?.some((m) =>
          m.toLowerCase().includes(filterMove.toLowerCase().trim())
        );
      return (
        matchesNumber && matchesName && matchesType && matchesGen && matchesMove
      );
    });

    // Sorting logic
    if (sortConfig.key) {
      filteredResults = [...filteredResults].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === "movesCount") {
          aVal = a.moves?.length || 0;
          bVal = b.moves?.length || 0;
        }

        if (typeof aVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else {
          return sortConfig.direction === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
        }
      });
    }

    setFiltered(filteredResults);
    setPage(1);
  }, [
    filterNumber,
    filterName,
    filterType,
    filterGeneration,
    filterMove,
    allPokemon,
    sortConfig,
  ]);

  const currentPageData = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const uniqueTypes = [
    ...new Set(allPokemon.flatMap((p) => [p.type1, p.type2]).filter(Boolean)),
  ];
  const uniqueGenerations = [...new Set(allPokemon.map((p) => p.generation))];

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (page * pageSize < filtered.length) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Pokémon Dashboard</h1>

      {/* Summary */}
      {summary && (
        <div className="summary-section">
          <h2>Summary</h2>

          <div className="summary-cards">
            <div className="summary-card highlight-card">
              <h3>Total Pokémon</h3>
              <p>{summary.totalSpecies}</p>
            </div>

            <div className="summary-card">
              <h3>By Type</h3>
              <ul className="summary-list">
                {Object.entries(summary.countsByType).map(([type, count]) => (
                  <li key={type}>
                    <span>{type}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="summary-card">
              <h3>By Generation</h3>
              <ul className="summary-list">
                {Object.entries(summary.countsByGeneration).map(
                  ([gen, count]) => (
                    <li key={gen}>
                      <span>Gen {gen}</span>
                      <span>{count}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Filter Nav Bar */}
      <FilterBar
        filterNumber={filterNumber}
        setFilterNumber={setFilterNumber}
        filterName={filterName}
        setFilterName={setFilterName}
        filterType={filterType}
        setFilterType={setFilterType}
        filterGeneration={filterGeneration}
        setFilterGeneration={setFilterGeneration}
        filterMove={filterMove}
        setFilterMove={setFilterMove}
        uniqueTypes={uniqueTypes}
        uniqueGenerations={uniqueGenerations}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        setSortConfig={setSortConfig}
      />

      {/* Grid */}
      <div className="pokemon-grid">
        {" "}
        {currentPageData.map((p) => (
          <div key={p.number} className="pokemon-card">
            <img src={p.imageUrl} alt={p.name} />
            <h2>{p.name}</h2>
            {/* Table Columns */}
            <table>
              <tbody>
                {/* Number */}
                <tr>
                  <td>#</td>
                  <td>{p.number}</td>
                </tr>
                {/* Generation */}
                <tr>
                  <td>Gen</td>
                  <td>{p.generation}</td>
                </tr>
                {/* Height */}
                <tr>
                  <td>Height</td>
                  <td>{p.height}</td>
                </tr>
                {/* Weight */}
                <tr>
                  <td>Weight</td>
                  <td>{p.weight}</td>
                </tr>
                {/* Type 1 */}
                <tr>
                  <td>Type 1</td>
                  <td>{p.type1}</td>
                </tr>
                {/* Type 2 */}
                <tr>
                  <td>Type 2</td>
                  <td>{p.type2 || "-"}</td>
                </tr>
                {/* Moves */}
                <tr>
                  <td>Moves</td>
                  <td>{p.moves?.length || 0}</td>
                </tr>
              </tbody>
            </table>
            <Link to={`/pokemon/${p.number}`}>View Profile</Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>Page {page}</span>
        <button
          onClick={handleNext}
          disabled={page * pageSize >= filtered.length}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
