export default function ColorPin({item}) {
  return (
    <div
      className="mx-1.5 mb-1.5 grow rounded-lg p-2 h-20 relative"
      style={{ backgroundColor: item.value }}
    >
      <div className="absolute -top-6 left-0.5">{item.value}</div>
    </div>
  );
}
