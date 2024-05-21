import { AiFillCloseCircle } from "react-icons/ai";
import { useSearchParams } from 'react-router-dom';



const FiltersMobile = ({openMobileFilters,setOpenMobileFilters} : {
    openMobileFilters: boolean,
    setOpenMobileFilters: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [searchParams,setSearchParams] = useSearchParams()
    const selectedBrand = searchParams.get("brand");
    const selectedCategory = searchParams.get("category");
    const selectedGender = searchParams.get("gender");

    const filters = [
        {
          id: "brand",
          name: "Brand",
          options: [
            { value: "Air Jordan", label: "Air Jordan" },
            { value: "Champion", label: "Champion" },
            { value: "Converse", label: "Converse" },
            { value: "Gucci", label: "Gucci" },
            { value: "Nike", label: "Nike" },
            { value: "Vans", label: "Vans" },
            { value: "adidas", label: "Adidas" },
          ],
        },
        {
          id: "category",
          name: "Category",
          options: [
            { value: "lifestyle", label: "Lifestyle" },
            { value: "basketball", label: "Basketball" },
            { value: "other", label: "Other" },
            { value: "running", label: "Running" },
            { value: "skateboarding", label: "Skateboarding" },
          ],
        },
        {
          id: "gender",
          name: "Gender",
          options: [
            { value: "men", label: "Men" },
            { value: "women", label: "Women" },
            { value: "youth", label: "Youth" },
          ],
        },
      ];
  return (
      <>
      {openMobileFilters ? (
          <nav className="fixed w-full z-10 h-screen bg-black/80 top-0 left-0"></nav>
        ) : (
          ""
        )}

        <aside
          className={
            openMobileFilters
              ? "fixed flex flex-col bg-white h-screen w-[300px] duration-300 top-0 left-0 z-10"
              : "fixed flex flex-col bg-white h-screen w-[300px] duration-300 top-0 left-[-100%] z-10"
          }
        >
          <div className="p-4 text-black flex justify-between items-center">
            <h3 className=" text-2xl">Filters</h3>
            <AiFillCloseCircle
              onClick={() => setOpenMobileFilters(!openMobileFilters)}
              className="cursor-pointer text-red-600"
              size={20}
            />
          </div>
          <div className="flex flex-col gap-2 capitalize px-4">
            <div className="max-w-screen-xl bg-white min-h-sceen">
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
                            checked={selectedGender === cat.value}
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
                          />
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </>
  )
}

export default FiltersMobile

