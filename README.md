# Adopt A Pokémon

## 📚 Table of Contents
- [📄 Description](#-description)  
- [⚙️ Installation](#️-installation)  
- [🚀 Usage](#-usage)  
- [🛠️ Technologies Used](#️-technologies-used)

---

## 📄 Description

The **Pokémon Adoption Web App** is a full-stack application that lets users browse, filter, and explore Pokémon in a fun, adoption-themed interface. It includes detailed profiles for each Pokémon, summary analytics, and interactive evolution chains. The app is built with a **React frontend** and an **ASP.NET Core Web API backend**, powered by Pokémon data from a JSON dataset.

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/pokemon-adoption-app.git
cd pokemon-adoption-app
```

### 2. Install and run the backend (ASP.NET Core)
```bash
cd server
dotnet run
```

> The backend API will be served at: `http://localhost:5210`

### 3. Install and run the frontend (React)
```bash
cd client
npm install
npm run dev
```

> The frontend will run at: `http://localhost:5173` (or whichever port Vite chooses)

---

## 🚀 Usage

Once both servers are running:

- Visit the React frontend in your browser (usually `http://localhost:5173`)
- Use the **dashboard page** to:
  - View a summary of total Pokémon species
  - Filter Pokémon by number, name, type, generation, or move
  - Browse Pokémon cards (25 per page)
  - Click a Pokémon to view detailed information
- On the **details page**, you can:
  - See stats, moves, evolution info, and image
  - Navigate to previous or next evolutions via clickable links
  - Return to the dashboard with a single button

### Production Deployment

To serve the React app from the backend:

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Copy the build folder (`dist/` or `build/`) into:
   ```
   server/wwwroot/
   ```
3. Ensure this line is in your `Program.cs`:
   ```csharp
   app.MapFallbackToFile("index.html");
   ```
4. Publish the backend:
   ```bash
   dotnet publish -c Release
   ```

---

## 🛠️ Technologies Used

**Frontend:**
- React
- React Router
- Axios
- Vite (or CRA)
- CSS (custom styling)

**Backend:**
- ASP.NET Core Web API
- C#
- System.Text.Json

**Data:**
- Static JSON file (`pokemon.json`) from the PokeAPI dataset