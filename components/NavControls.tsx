import NavLanguagePicker from "./NavLanguagePicker";
import ThemeToggle from "./ThemeToggle";

export default function NavControls({
  light = false,
  showLanguage = true,
}: {
  light?: boolean;
  showLanguage?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      {showLanguage ? <NavLanguagePicker light={light} /> : null}
      <ThemeToggle light={light} />
    </div>
  );
}
