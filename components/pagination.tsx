'use client';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Link {
  url: string;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: Link[];
}

export default function Pagination({ links }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  function handleClickPage(pageNumber: number) {
    if (pageNumber > 1) {
      params.set('page', pageNumber.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleNextPreviousPageClick(url: string | null) {
    if (url === null) {
      return;
    }
    const page = parseInt(url.split('page=')[1]);
    handleClickPage(page);
  }

  return (
    <PaginationComponent>
      {links.length > 0 && (
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                links[0].url
                  ? 'cursor-pointer'
                  : 'cursor-auto text-slate-300 hover:text-slate-300'
              }
              isActive={false}
              onClick={() => handleNextPreviousPageClick(links[0].url)}
            />
          </PaginationItem>

          {links.slice(1, links.length - 1).map((l, index) => {
            if (l.label === '...') {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem
                className="hidden cursor-pointer md:inline-flex"
                key={index}
              >
                <PaginationLink
                  isActive={l.active}
                  onClick={() => handleClickPage(Number(l.label))}
                >
                  {l.label}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              className={
                links[links.length - 1].url
                  ? 'cursor-pointer'
                  : 'cursor-auto text-slate-300 hover:text-slate-300'
              }
              isActive={false}
              onClick={() =>
                handleNextPreviousPageClick(links[links.length - 1].url)
              }
            />
          </PaginationItem>
        </PaginationContent>
      )}
    </PaginationComponent>
  );
}
