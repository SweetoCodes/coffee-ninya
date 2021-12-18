import Typewriter from "typewriter-effect";

export default function TypewriterHeadline(props) {
  return (
    <div className="flex flex-col text-3xl sm:text-5xl text-center flex-wrap">
      <div className="flex flex-col sm:flex-row mx-auto space-x-2">
        <p className="font-bold text-overflow-center">Meet your</p>
        <Typewriter
          className="text-overflow-center"
          options={{
            strings: props.data,
            autoStart: true,
            loop: true,
            delay: 80,
            deleteSpeed: 40,
            pauseFor: 1200,
            skipAddStyles:true,
            wrapperClassName:"text-overflow-center",
          }}
        />
      </div>
      <span>over coffee</span>
    </div>
  );
}
