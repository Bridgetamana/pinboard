export default function ImagePin({ item }) {
  return (
    <div className="mx-1.5 mb-1.5 overflow-hidden rounded-xl bg-background-color">
      <img
        src={item.value}
        alt="Pasted image pin"
        className="block h-auto w-full rounded-lg object-cover"
      />
    </div>
  );
}