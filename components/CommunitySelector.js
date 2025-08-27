const communities = [
  "หมู่1-บ้านหนองสี่แจ่ง",
  "หมู่2-บ้านสันป่าสัก",
  "หมู่3-บ้านหนองแฝก",
  "หมู่4-บ้านหนองแฝกป่าคา",
  "หมู่5-บ้านหนองแฝก",
  "หมู่6-บ้านกู่แดง",
  "หมู่7-บ้านสันป่าเดื่อ",
  "หมู่8-บ้านหนองสี่แจ่ง",
  "หมู่9-บ้านสันป่าสัก",
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
              ? "bg-blue-600 text-white border-none"
              : "bg-blue-100 text-blue-500 hover:bg-blue-300 border-none"
          } transition duration-200 min-w-[120px] max-w-full sm:w-auto`}
        >
          {c}
        </button>
      ))}
    </div>
  </div>
);
export default CommunitySelector;
