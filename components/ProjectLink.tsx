export default function ProjectLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-text-link"
    >
      {label}
    </a>
  );
}
