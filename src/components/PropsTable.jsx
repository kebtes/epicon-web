export default function PropsTable({ rows, columns = ['Parameter', 'Type', 'Default', 'Description'] }) {
  return (
    <div className="overflow-x-auto mb-6 rounded-xs border border-white/10">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02]">
            {columns.map(col => (
              <th key={col} className="text-left py-2.5 px-4 text-white/40 font-medium text-xs uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 px-4 ${j === 0 ? 'text-white/80 font-mono text-xs' : 'text-white/60 text-xs'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
