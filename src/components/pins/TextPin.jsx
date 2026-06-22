export default function TextPin({item}) {
    return <div className="p-4 mx-1.5 rounded-xl mb-1.5 bg-background-color grow">{item.value}</div>;
}