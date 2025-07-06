const communities = [
  "หมู่1-สะอาด",
  "หมู่2-หนองเรือ",
  "หมู่3-นาศรี",
  "หมู่4-โคกสว่าง",
  "หมู่5-หนองอ้อ",
  "หมู่6-โนนดงมัน",
  "หมู่7-ค้อท่าโพธิ์",
  "หมู่8-คำบง",
  "หมู่9-คำบง",
  "หมู่10-ดงเค็ง",
  "หมู่11-คำบง",
  "หมู่12-นาศรี",
  "หมู่13-คำบง",
  "หมู่14-โนนดงมัน",
];

const CommunitySelector = ({ selected, onSelect = () => {}, error }) => (
  <div className="mb-4">
    <div className="flex py-2 gap-2">
      <label className="block text-sm font-medium text-gray-800 mb-1">
        1.เลือกชุมชน
      </label>
      {error && <div className="text-red-500 text-sm ml-auto">{error}</div>}
    </div>
    <div className="flex flex-wrap gap-2">
      {communities.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          className={`btn btn-sm rounded-full px-4 py-2 text-base font-medium ${
            selected === c
              ? "bg-orange-400 text-white border-none"
              : "bg-orange-100 text-orange-700 hover:bg-orange-300 border-none"
          } transition duration-200 min-w-[120px] max-w-full sm:w-auto`}
        >
          {c}
        </button>
      ))}
    </div>
  </div>
);
export default CommunitySelector;
