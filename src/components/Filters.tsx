import { useSearchParams } from "react-router-dom";
import { filters } from "../consts";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBrand = searchParams.get("brand");
  const selectedCategory = searchParams.get("category");
  const selectedGender = searchParams.get("gender");
  return (
    <div className="w-[25vw]  md:flex-col hidden md:flex">
      <div className="max-w-md bg-white min-h-sceen">
        <div className="grid divide-y divide-neutral-200 max-w-xl pr-4">
          <div className="py-5 w-full">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none ">
                <span className="font-bold text-lg"> Category</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="flex flex-col gap-1 pr-1 mt-2">
                {filters[1].options.map((cat) => (
                  <div
                    className="flex items-center justify-between"
                    key={cat.value}
                  >
                    <label htmlFor={cat.value}>{cat.label}</label>
                    <input
                      type="checkbox"
                      name={cat.value}
                      id={cat.value}
                      value={cat.value}
                      checked={selectedCategory?.includes(cat.value)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          searchParams.set("category", value);
                        } else {
                          searchParams.delete("category");
                        }
                        setSearchParams(searchParams, {
                          replace: true,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </details>
          </div>
          <div className="py-5 w-full">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none ">
                <span className="font-bold text-lg"> Brand</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="flex flex-col gap-1 pr-1 mt-2">
                {filters[0].options.map((cat) => (
                  <div
                    className="flex items-center justify-between"
                    key={cat.value}
                  >
                    <label htmlFor={cat.value}>{cat.label}</label>
                    <input
                      type="checkbox"
                      name={cat.value}
                      id={cat.value}
                      value={cat.value}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          searchParams.set("brand", value);
                        } else {
                          searchParams.delete("brand");
                        }
                        setSearchParams(searchParams, {
                          replace: true,
                        });
                      }}
                      checked={selectedBrand?.includes(cat.value)}
                    />
                  </div>
                ))}
              </div>
            </details>
          </div>
          <div className="py-5 w-full">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none ">
                <span className="font-bold text-lg"> Gender</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="flex flex-col gap-1 pr-1 mt-2">
                {filters[2].options.map((cat) => (
                  <div
                    className="flex items-center justify-between"
                    key={cat.value}
                  >
                    <label htmlFor={cat.value}>{cat.label}</label>
                    <input
                      type="checkbox"
                      name={cat.value}
                      id={cat.value}
                      value={cat.value}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          searchParams.set("gender", value);
                        } else {
                          searchParams.delete("gender");
                        }
                        setSearchParams(searchParams, {
                          replace: true,
                        });
                      }}
                      checked={selectedGender === cat.value}
                    />
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
