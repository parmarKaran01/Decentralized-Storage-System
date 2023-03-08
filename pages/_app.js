import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { MoralisProvider } from "react-moralis";
import HALO from "vanta/dist/vanta.halo.min";
import Footer from "../components/Footer";
import * as THREE from "three";
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp({ Component, pageProps }) {
  const myRef = useRef();
  const [vantaEffect, setVantaEffect] = useState(0);
  useEffect(() => {
    const threeScript = document.createElement("script");
    threeScript.setAttribute("id", "threeScript");
    threeScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
    );
    document.getElementsByTagName("head")[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);

  // useEffect(() => {
  //   // console.log("BIRDS", myRef.curent);
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       HALO({
  //         THREE,
  //         el: myRef.current,
  //         // backgroundColor : "#fffff",
  //         // color: "#26a69a",
  //         // points: 15
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 200.0,
  //         minWidth: 200.0,
  //         amplitudeFactor: 4.0,
  //         size: 2.0,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  return (
    <>
      <Provider store={store}>
        <div ref={myRef}>
          {/* <MoralisProvider appId={}> */}
          <Navbar />
          <Component {...pageProps} />
          {/* </MoralisProvider> */}
          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
