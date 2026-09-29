export default function Container({ children, className = "" }) {
  return <main className={`container ${className}`}>{children}</main>;
}
