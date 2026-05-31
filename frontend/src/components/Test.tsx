import { SearchResult } from "@/data/SearchResult";
import { cn } from "@/utils/cn";
import { IconSearch } from "@tabler/icons-react";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface exportType {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Test({ className, isOpen: externalOpen, onClose }: exportType) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen ?? internalOpen;
  const setIsOpen = onClose ? () => onClose() : setInternalOpen;
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0); 

  const slug = SearchResult.flatMap((item) =>
    item.sectionSearchResult
      .filter((section) => section.redirect) // ensure redirect exists
      .map((section) => ({
        page: section.page,
        redirect: section.redirect,
      })),
  );

  console.log(slug);

  const navigate = useNavigate();

  function handleredirect(label: string) {
    slug.map((item) => {
      if (item.page == label) {
        navigate(`${item.redirect}`);
        setIsOpen(false);
      }
    });
  }

  const filteredSearch = SearchResult.map((section) => ({
    ...section,
    sectionSearchResult: section.sectionSearchResult.filter((item) =>
      item.page.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((section) => section.sectionSearchResult.length > 0);

  const flatResults = filteredSearch.flatMap(section => section.sectionSearchResult); 

  function handleKeyDown (e: React.KeyboardEvent) {
    if(e.key === "ArrowDown") {
        e.preventDefault(); 
        setSelectedIndex(prev => Math.min(prev + 1, flatResults.length - 1))
    } else if (e.key === 'ArrowUp') {
        e.preventDefault(); 
        setSelectedIndex(prev => Math.max(prev - 1, 0)); 
    } else if (e.key === "Enter") {
        e.preventDefault(); 
        const selected = flatResults[selectedIndex]; 
        if(selected) handleredirect(selected.page); 
    }
  }

  useEffect(() => {
    setSelectedIndex(0); 
  }, [searchQuery]); 

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  let currentIndex = 0; 

  return (
    <>
      {isOpen && (
        <section
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center px-3",
            className,
          )}
        >
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-900/80 backdrop-blur-xl transition-opacity"
          />

          <div className="relative mx-auto flex w-full max-w-2xl transform flex-col rounded-xl bg-neutral-50/90 shadow-md transition-all h-200 dark:bg-zinc-900">
            <div className="sticky inset-0 z-50 flex w-full items-center rounded-t-xl border-b border-neutral-400/40 px-2 py-5">
              <IconSearch
                stroke={2}
                size={25}
                className="mx-2 text-neutral-600 dark:text-neutral-200"
              />

              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                className="w-full bg-transparent pl-2 font-finlandica text-xl leading-none outline-none dark:text-white"
                placeholder="Search pages, products, cart items..."
              />

              <kbd className="text-nuetral-500 mx-4 flex rounded-sm bg-blue-100/40 px-2 py-2.5 text-center font-finlandica text-sm leading-2 font-semibold text-neutral-600 ring-2 ring-neutral-400 dark:text-neutral-200 dark:bg-neutral-700 dark:ring-neutral-600">
                ESC
              </kbd>
            </div>

            <div className="custom-scrollbar flex flex-col gap-4 overflow-y-auto">
              {filteredSearch.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col px-5 py-5 outline-none"
                  >
                    <h1 className="font-finlandica font-bold tracking-widest text-neutral-600 uppercase dark:text-neutral-200">
                      {item.label}
                    </h1>

                    <div className="mt-5 flex flex-col gap-5">
                      {item.sectionSearchResult.map((item) => {
                        const idx = currentIndex++; 
                        const Icon = item.Icon;
                        const Image = item.Img;

                        return (
                          <button
                            className={`group flex items-center justify-between outline-none ${selectedIndex === idx ? "bg-amber-500/10" : ""} hover:bg-amber-500/10`}
                            onClick={() => handleredirect(item.page)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            ref={el => {if (selectedIndex === idx) el?.scrollIntoView({ block: 'nearest' }); }}
                          >
                            <div className="flex items-center gap-5 rounded-l-xl">
                              {Icon && (
                                <Icon
                                    className={`rounded-xl border border-neutral-200 bg-blue-200/20 p-3 text-neutral-500 group-hover:bg-linear-to-br from-amber-300 to-amber-600 group-hover:text-white ${selectedIndex === idx ? "bg-linear-to-br from-amber-300 to-amber-600 text-white" : ""} dark:border-neutral-600 dark:text-neutral-400 `}
                                  size={52}
                                />
                              )}
                              {Image && (
                                <img
                                  src={Image.src}
                                  alt={Image.alt}
                                  className="rounded-xl border border-neutral-200 bg-blue-200/20 object-cover text-neutral-500"
                                  style={{ width: 52, height: 52 }}
                                />
                              )}
                              <h2 className="flex items-center font-finlandica text-xl font-medium capitalize dark:text-white">
                                {item.page}
                              </h2>
                            </div>

                            <div className={`px-5 font-bold ${selectedIndex === idx ? "block" : "hidden"} group-hover:block`}>
                              <ArrowRightIcon
                                size={18}
                                className="text-amber-600"
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
