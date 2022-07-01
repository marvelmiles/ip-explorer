// since this is a simple demo project  i don't wish to add this polyfill
// polyfill exist at https://vanillajstoolkit.com/polyfills/matchmedia/
// onchange event polyfill exist at https://vanillajstoolkit.com/polyfills/matchmediaaddeventlistener/

import { useEffect, useState } from "react";

//eslint-disable-next-line
export default (mediaQuery = "") => {
  const [matches, setMatches] = useState(window.matchMedia(mediaQuery).matches);
  useEffect(() => {
    const fn = () => setMatches(window.matchMedia(mediaQuery).matches);
    window.addEventListener("resize", fn, false);
    return () => window.removeEventListener("resize", fn, false);
  }, [mediaQuery]);
  return matches;
};
