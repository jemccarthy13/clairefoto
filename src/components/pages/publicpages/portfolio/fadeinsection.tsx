import React from "react";

/**
 * The only props for a FadeInSection are the children.
 * Not explicity provided; passed through normal use.
 * i.e.
 * <FadeInSection>
 *   //.. children elements here
 * </FadeInSection
 */
interface IFadeInSectionProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * A helper utility to 'fade in' when the element is visible in the
 * viewing pane
 *
 * @param props Capture the children to passthrough
 * @returns UI Component that fades in when visible on viewport
 */
export default function FadeInSection(props: IFadeInSectionProps) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef: any = React.createRef();

  // Observe the dom and setVisible for any entry that is on screen
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, [domRef]);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
