export default function Badge({ value }) {
    return <span className={`badge badge-${value}`}>{value.replace("_", " ")}</span>;
}