// eslint-disable-next-line @typescript-eslint/TS2322

import sqlFormatter from "@sqltools/formatter";
import { useEffect, useRef, useState } from "preact/hooks";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface Wiwdom {
  author: string;
  wisdom: string;
}

export function App() {
  const [inputSql, setInputSql] = useState("SELECT * FROM data WHERE id = ?: '1'");
  const [isVisible, setIsVisible] = useState(false);
  const [outputSql, setOutputSql] = useState("");
  const [error, setError] = useState("");
  const textAreaRef = useRef(null);
  const wisdomArray = [
    {
      author: "George Bernard Shaw",
      wisdom: "Life isn't about finding yourself. Life is about creating yourself.",
    },
    { author: "Eleanor Roosevelt", wisdom: "You must do the things you think you cannot do." },
    { author: "Frank Lloyd Wright", wisdom: "The truth is more important than the facts." },
    { author: "Mother Teresa", wisdom: "If you judge people, you have no time to love them." },
    {
      author: "Lucille Ball",
      wisdom: "Love yourself first, and everything else falls into place.",
    },
    {
      author: "Stephen Colbert",
      wisdom:
        "Dreams can change. If we’d all stuck with our first dream, the world would be overrun with cowboys and princesses.",
    },
    { author: "Oprah Winfrey", wisdom: "Failure is another stepping-stone to greatness." },
    { author: "Stephen Hawking", wisdom: "Be curious." },
    { author: "Mother Teresa", wisdom: "If you can't feed a hundred people, then feed just one." },
    { author: "William Shakespeare", wisdom: "Love all, trust a few." },
    {
      author: "Michelle Obama",
      wisdom:
        "Success isn't about how much money you make. It's about the difference you make in people's lives.",
    },
    { author: "Wayne Gretzky", wisdom: "You miss 100 percent of the shots you don't take." },
    { author: "Gabrielle Giffords", wisdom: "Be bold, be courageous, be your best." },
    {
      author: "Madeleine Albright",
      wisdom:
        "Real leadership...comes from realizing that the time has come to move beyond waiting to doing.",
    },
    { author: "Babe Ruth", wisdom: "Don't let the fear of striking out hold you back." },
    { author: "Seneca", wisdom: "Luck is what happens when preparation meets opportunity." },
    {
      author: "Anna Quindlen",
      wisdom:
        "Don’t ever confuse the two: your life and your work. The second is only part of the first.",
    },
    { author: "Thomas Jefferson", wisdom: "He who knows best knows how little he knows." },
    { author: "Dolly Parton", wisdom: "If you want the rainbow, you gotta put up with the rain." },
    { author: "Francis David", wisdom: "We need not think alike to love alike." },
    {
      author: "John Quincy Adams",
      wisdom:
        "If your actions inspire others to dream more, learn more, do more, and become more, you are a leader.",
    },
    {
      author: "Maya Angelou",
      wisdom:
        "People will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    },
    { author: "Malcolm X", wisdom: "If you don't stand for something, you'll fall for anything." },
    {
      author: "Hillary Clinton",
      wisdom: "Every moment wasted looking back keeps us from moving forward.",
    },
    {
      author: "Thomas A. Edison",
      wisdom:
        "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    },
    {
      author: "Katie Couric",
      wisdom: "You can't please everyone, and you can't make everyone like you.",
    },
    {
      author: "Jon Bon Jovi",
      wisdom:
        "Miracles happen every day. Change your perception of what a miracle is and you'll see them all around you.",
    },
    { author: "Eleanor Roosevelt", wisdom: "Do one thing every day that scares you." },
    { author: "Tina Fey", wisdom: "There are no mistakes, only opportunities." },
    { author: "Francis Bacon", wisdom: "A prudent question is one half of wisdom." },
    {
      author: "Sheryl Sandberg",
      wisdom: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    },
    {
      author: "Eleanor Roosevelt",
      wisdom: "Remember, no one can make you feel inferior without your consent.",
    },
    {
      author: "Florence Nightingale",
      wisdom: "I attribute my success to this: I never gave or took any excuse.",
    },
    { author: "Edwin Land", wisdom: "Creativity is the sudden cessation of stupidity." },
    {
      author: "Maya Angelou",
      wisdom: "You can’t use up creativity. The more you use, the more you have.",
    },
    { author: "Mahatma Gandhi", wisdom: "Be the change that you wish to see in the world." },
    {
      author: "Lao Tzu, Tao Te Ching",
      wisdom: "When I let go of who I am, I become what I might be.",
    },
    { author: "Rosa Parks", wisdom: "When one's mind is made up, this diminishes fear." },
    {
      author: "Henry Ford",
      wisdom: "Whether you think you can or you think you can’t, you’re right.",
    },
    { author: "Gloria Steinem", wisdom: "Dreaming, after all, is a form of planning." },
    { author: "Christopher Reeve", wisdom: "Once you choose hope, anything's possible." },
    { author: "Kate Winslet", wisdom: "Life is short, and it is here to be lived." },
    {
      author: "Mahatma Gandhi",
      wisdom: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    },
    {
      author: "Alice Walker",
      wisdom: "The most common way people give up their power is by thinking they don’t have any.",
    },
    { author: "Lao Tzu, Tao Te Ching", wisdom: "Great acts are made up of small deeds." },
    {
      author: "Amelia Earhart",
      wisdom: "The most difficult thing is the decision to act. The rest is merely tenacity.",
    },
    {
      author: "Ellen DeGeneres",
      wisdom:
        "Sometimes you can't see yourself clearly until you see yourself through the eyes of others.",
    },
    {
      author: "Walt Disney",
      wisdom: "All our dreams can come true if we have the courage to pursue them.",
    },
  ];

  const getRandomWisdom = () => {
    const randomIndex = Math.floor(Math.random() * wisdomArray.length);
    return wisdomArray[randomIndex];
  };
  const [wisdom, setWisdom] = useState<Wiwdom>(getRandomWisdom());
  const createQueryFromInput = (input: string) => {
    setInputSql(input);
    if (input === "") {
      setInputSql("");
      setOutputSql("");
      setError("");
      setWisdom(getRandomWisdom());
      return;
    }
    try {
      setInputSql(input);

      const splitInput = input.split(":");

      if (splitInput.length !== 2) {
        throw new Error("The hell...");
      }

      // count the number of ? in the first part of the split
      const numberOfQuestionMarks = splitInput[0].split("?").length - 1;
      // count the number of appostrophes in the second part of the split
      const numberOfAppostrophes = splitInput[1].split("'").length - 1;

      // if the number of ? is not equal to the number of appostrophes, throw an error
      if (numberOfQuestionMarks !== numberOfAppostrophes / 2) {
        throw new Error("The hell...");
      }

      const splitValues = splitInput[1].split(",");

      // Trim all values of splitValues
      splitValues.forEach((value, index) => {
        splitValues[index] = value.trim();
      });
      console.log(splitValues);

      // Replace first ? with first value, second ? with second value, etc.
      let query = splitInput[0];
      splitValues.forEach((value) => {
        query = query.replace("?", value);
      });
      console.log(query);
      setError("");
      const formattedSql = sqlFormatter.format(query);
      setOutputSql(formattedSql);
    } catch (error) {
      console.log(error);
      setError("Error parsing input");
      setOutputSql("Error parsing input");
    }
  };
  useEffect(() => {
    console.log("Made with love by ipko ❤️");
    // @ts-expect-error
    textAreaRef.current.select();
    createQueryFromInput(inputSql);
  }, []);

  useEffect(() => {
    // Set a timeout to hide the text after 3 seconds
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    // Clean up the timeout when the component unmounts or when visibility changes
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  const resetTexts = () => {
    setInputSql("");
    setOutputSql("");
    setError("");
    // @ts-expect-error
    textAreaRef.current.focus();
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center ">🈳️ SQL query maker 🔤</h1>

      <textarea
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck={false}
        className="w-full h-64 border-2 outline-none"
        value={inputSql}
        ref={textAreaRef}
        onInput={(e) => createQueryFromInput(e.currentTarget.value)}
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between px-5 relative">
        <button
          className="bg-red-500 hover:bg-red-600 text-slate-100 disabled:bg-gray-300 disabled:hover:bg-gray-300 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => resetTexts()}
          disabled={inputSql === ""}
        >
          🗑️ Delete input
        </button>

        <button
          disabled={outputSql === ""}
          className="bg-lime-500 text-slate-100 hover:bg-lime-600 disabled:bg-gray-300 disabled:hover:bg-gray-300 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            navigator.clipboard.writeText(outputSql);
            setIsVisible(true);
            console.log("Copied to clipboard");
          }}
        >
          📄 Copy output
        </button>
      </div>
      <div class={"flex justify-end p-5 my-4 "}>
        {isVisible && (
          <p className="text-sm absolute italic text-gray-600">
            {outputSql ? "Copied to clipboard" : "Nothing to copy"}
          </p>
        )}
      </div>

      <CodeEditor
        // @ts-expect-error
        value={outputSql}
        readOnly
        language="sql"
        placeholder={
          inputSql === "" ? `${wisdom.wisdom} - ${wisdom.author}` : "Output will appear here"
        }
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </>
  );
}
