const SearchComponent = ({ allData }) => {
  const [query, setQuery] = React.useState("");

  // Logic: This recalculates every time the 'query' changes
  const results = allData.filter((item) => {
    const name = item.name ? item.name.toLowerCase() : "";
    return name.includes(query.toLowerCase());
  });

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search players or teams..."
        className="border p-2 rounded w-full mb-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {/* Search Results */}
      <div className="space-y-2">
        {results.length > 0 ? (
          results.map(item => (
            <div key={item.id} className="p-2 bg-white border rounded">
              {item.name}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No matches found.</p>
        )}
      </div>
    </div>
  );
};
