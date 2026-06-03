export default function ColorPin({item}) {
  return (
    <>
      <div style={{ backgroundColor: item.value }} className="h-3/4"></div>
      <div className="flex h-1/4 items-center px-3 py-4">{item.value}</div>
    </>
  );
}
