import { useState, useEffect } from "react";
import ReactMarkDown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

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
    <>
      {currentIndex !== text.length ? (
        <div className="text-sm leading-relaxed">
          {currentText.split("\n").map((line, index) => (
            <p key={index}>
              {line}
              {index < currentText.split("\n").length - 1 && <br />}
            </p>
          ))}
        </div>
      ) : (
        <ReactMarkDown
          rehypePlugins={[
            remarkGfm,
            rehypeRaw,
            [rehypeExternalLinks, { target: "_blank" }],
          ]}
          children={text}
          className="markdown text-sm leading-relaxed"
        />
      )}
    </>
  );
};

export default Typewriter;
