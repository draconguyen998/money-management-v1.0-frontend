import { addThousandsSeparator } from "../util/util"; // nếu bạn đã có hàm này
// nếu chưa có, mình sẽ gửi bản khác

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0]?.payload; // { date, amount, details[] }

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
      <p className="text-sm font-semibold text-gray-900">{label}</p>

      <p className="mt-1 text-sm text-gray-700">
        <span className="font-semibold">Total:</span>{" "}
        <span className="font-semibold text-violet-600">
          ₹{addThousandsSeparator(item?.amount ?? 0)}
        </span>
      </p>

      {item?.details?.length ? (
        <div className="mt-2">
          <p className="text-xs font-semibold text-gray-600">Details:</p>
          <div className="mt-1 space-y-1">
            {item.details.slice(0, 3).map((d, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-6">
                <span className="text-xs text-gray-600">{d.label}:</span>
                <span className="text-xs font-medium text-gray-800">
                  ₹{addThousandsSeparator(d.value)}
                </span>
              </div>
            ))}
            {item.details.length > 3 && (
              <p className="text-[11px] text-gray-400">
                +{item.details.length - 3} more…
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomTooltip;
