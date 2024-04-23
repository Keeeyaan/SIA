import { useState, useEffect } from "react";

const Typewriter = ({
  text,
  delay,
  infinite,
}: {
  text: string;
  delay: number;
  infinite: boolean;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: number | NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText("");
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return (
    <p className="text-sm leading-relaxed">
      {currentText.split("\n").map((line, index) => (
        <div key={index}>
          {line}
          {index < currentText.split("\n").length - 1 && <br />}
        </div>
      ))}
    </p>
  );
};

export default Typewriter;
