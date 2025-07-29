type Props = {
  departments: string[];
  locations: string[];
  department: string;
  setDepartment: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
};

const Filters = ({
  departments,
  locations,
  department,
  setDepartment,
  location,
  setLocation,
}: Props) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:justify-end">
    {/* Department Dropdown */}
    <select
      className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#56B9F0] w-full sm:w-[180px] md:w-[200px] font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%227%22%20viewBox%3D%220%200%2010%207%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200l5%207%205-7z%22%20fill%3D%22%232E3E95%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.8rem_center] bg-[length:0.65rem] cursor-pointer truncate overflow-hidden whitespace-nowrap"
      style={{
        borderColor: "#56B9F0",
        backgroundColor: "#F4F4FF",
        color: "#2E3E95",
      }}
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
    >
      {departments.map((dep) => (
        <option key={dep} className="truncate">
          {dep}
        </option>
      ))}
    </select>

    {/* Location Dropdown */}
    <select
      className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#56B9F0] w-full sm:w-[180px] md:w-[180px] font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%227%22%20viewBox%3D%220%200%2010%207%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200l5%207%205-7z%22%20fill%3D%22%232E3E95%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.8rem_center] bg-[length:0.65rem] cursor-pointer"
      style={{
        borderColor: "#56B9F0",
        backgroundColor: "#F4F4FF",
        color: "#2E3E95",
      }}
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      title={location} // tooltip shows full text
    >
      {locations.map((loc) => (
        <option key={loc} value={loc} title={loc}>
          {loc.length > 28 ? loc.slice(0, 25) + "..." : loc}
        </option>
      ))}
    </select>
  </div>
);

export default Filters;
