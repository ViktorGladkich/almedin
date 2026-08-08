/**
 * Page frame ("paspartu").
 *
 * A fixed overlay, NOT padding on each section: padding-per-section shows a
 * seam at every section boundary and forces full-bleed elements to fight their
 * own container.
 *
 * The colour comes from `--frame-color`, which ThemeScroll drives, so the
 * border inverts together with the page instead of leaving a dark section
 * sitting inside a cream rectangle.
 *
 * Geometry lives in `.page-frame` / `.pf-edge` in globals.css, next to the
 * `--frame` definition it depends on.
 */
export function PageFrame() {
  return (
    <div aria-hidden className="page-frame">
      <span className="pf-edge pf-top" />
      <span className="pf-edge pf-bottom" />
      <span className="pf-edge pf-left" />
      <span className="pf-edge pf-right" />
    </div>
  );
}