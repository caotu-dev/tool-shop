import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { AppSelect } from "@/components/common/AppSelect";
import { Button } from "@/components/ui/button";
import { currencyFormat, objectToQueryParams } from "@/lib/utils";

interface FilterBarProps {
  minPrice?: number;
  maxPrice?: number;
  sortField?: string;
  sortBy?: string;
}

function ProductFilter(props: FilterBarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    props?.minPrice ?? 0,
    props?.maxPrice ?? 500,
  ]);
  const defaultSort =
    props?.sortBy && props?.sortField
      ? `${props?.sortField}-${props?.sortBy}`
      : "";
  const [sort, setSort] = useState<string>(defaultSort);

  const handleApplyFilters = () => {
    const sortArr = sort.split("-");
    const data = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortField: "",
      sortBy: "",
    };

    if ((sortArr.length = 2)) {
      data["sortField"] = sortArr[0];
      data["sortBy"] = sortArr[1];
    }

    const params = objectToQueryParams(data);
    window.location.href = `${window.location.pathname}?${params}`;
  };

  return (
    <nav className="grid grid-cols-12 my-4 items-center px-4 py-2 w-full border gap-4 mb-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="col-span-12 md:col-span-10 gap-10 grid grid-cols-3">
        <div className=" items-center gap-2 w-full md:w-auto col-span-3 md:col-span-2">
          <div>
            <div className="flex justify-between text-xs mb-2 text-gray-700 dark:text-gray-300">
              <span>{currencyFormat(priceRange[0])}</span>
              <span>{currencyFormat(priceRange[1])}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={priceRange}
              min={0}
              max={90000000}
              step={10000}
              defaultValue={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
            >
              <Slider.Track className="bg-gray-300 dark:bg-gray-700 relative grow rounded-full h-[4px]">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </Slider.Root>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto col-span-3 md:col-span-1">
          <AppSelect
            items={[
              { value: "createdAt-asc", title: "Lastest arrivals" },
              { value: "createdAt-desc", title: "Oldest" },
              { value: "price-asc", title: "Price: Low to High" },
              { value: "price-desc", title: "Price: High to Low" },
            ]}
            selectLabel={"Sort"}
            placeholder={"Sort product"}
            className={`w-full`}
            onValueChange={setSort}
            defaultValue={sort}
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-2 text-end">
        <Button className="col-span-1" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </nav>
  );
}

export { ProductFilter };
