import CircularText from "./CircularText.jsx";
import FloatingLines from "../background/testbackground.jsx";
import TextPressure from './TextPressure.jsx';

function Test() {
    return (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>

            {/* FloatingLines underneath */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <FloatingLines
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[10, 15, 20]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                />
            </div>

            {/* Text pressure on top */}
            <div style={{position: 'absolute',width: '400px', bottom: '50px', right: 0, zIndex: 10, pointerEvents: 'none'}}>
                <div style={{ pointerEvents: "auto" }}>
                    <TextPressure
                        text="Hello!"
                        flex={false}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="black"
                        strokeColor="#ff0000"
                        minFontSize={30}
                    />
                </div>
            </div>

            {/* CircularText on top */}
            <div
                style={{
                    position: "absolute",
                    left: "50px",
                    bottom: "50px",
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "none", // <-- default all passes through
                }}
            >
                {/* Make only the text itself interactive */}
                <div style={{ pointerEvents: "auto" }}>
                    <CircularText
                        text="D O G S * & * C A T S * S H O W E R * "
                        spinDuration={20}
                        onHover="speedUp"
                    />
                </div>
            </div>
        </div>
    );
}

export default Test;
