// components/ProgressBar.tsx
interface ProgressBarProps {
  raised: number | null;
  target: number | null;
  label?: string;
}

export default function ProgressBar({ raised, target, label }: ProgressBarProps) {
  const hasData = raised !== null && target !== null;
  const percent = hasData ? Math.min((raised! / target!) * 100, 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-semibold text-white mb-2">{label}</p>
      )}
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div
          className="bg-yellow h-3 rounded-full transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-2">
        {hasData
          ? `£${raised!.toLocaleString()} raised of £${target!.toLocaleString()} target`
          : "Target to be confirmed — every donation counts"}
      </p>
    </div>
  );
}
