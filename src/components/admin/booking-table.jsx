export default function BookingTable({
  tableData,
  columns,
  emptyMessage = "Table is empty",
}) {
  return (
    <div className="bg-gray-800 shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead className="bg-gray-700">
            <tr>
              {columns.map((data, i) => {
                return (
                  <th
                    key={i}
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider text-left"
                  >
                    {data.header.toUpperCase()}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {tableData.length > 0 ? (
              tableData.map((bookingData) => (
                <tr key={bookingData._id} className="hover:bg-gray-700">
                  {columns.map((data, i) => {
                    return (
                      <td
                        key={i}
                        className="px-6 py-4 whitespace-nowrap 
                    text-sm text-gray-300"
                      >
                        {data.render(bookingData)}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
