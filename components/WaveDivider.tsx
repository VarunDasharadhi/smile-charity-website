interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export default function WaveDivider({ fromColor, toColor, flip = false }: WaveDividerProps) {
  return (
    <div aria-hidden="true" className="block w-full leading-none">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`block w-full h-[40px] md:h-[64px] ${flip ? "-scale-y-100" : ""}`}
      >
        <rect width="1440" height="100" fill={fromColor} />
        <path d="M0,50 C 360,95 1080,10 1440,50 L1440,100 L0,100 Z" fill={toColor} />
      </svg>
    </div>
  );
}
