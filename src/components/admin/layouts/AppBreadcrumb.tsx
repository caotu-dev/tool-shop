import { SlashIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface Props {
  items: { id: number; name: string; url?: string }[];
}

function AppBreadCrumb(props: Readonly<Props>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.items.map((item, index) => {
          if (!item?.url) {
            return (
              <BreadcrumbItem key={item.id}>
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <React.Fragment key={item.id}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href={item.url}>{item.name}</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { AppBreadCrumb };
